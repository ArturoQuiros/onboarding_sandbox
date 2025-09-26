import React, { createContext, useState, useEffect, useMemo } from "react";
import i18next from "i18next";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es"); // Valor por defecto inmediato
  const [isInitialized, setIsInitialized] = useState(false);

  // Inicializar desde localStorage solo después del montaje
  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang && storedLang !== language) {
      setLanguage(storedLang);
    }
    setIsInitialized(true);
  }, []);

  // Sincronizar con i18next y localStorage solo después de la inicialización
  useEffect(() => {
    if (isInitialized) {
      i18next.changeLanguage(language);
      localStorage.setItem("language", language);
    }
  }, [language, isInitialized]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
