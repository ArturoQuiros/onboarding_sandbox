// src/context/LanguageContext.jsx
import React, { createContext, useState, useEffect } from "react";
import i18next from "i18next";

// Crea el contexto para el idioma.
export const LanguageContext = createContext();

// Función auxiliar para obtener el idioma de localStorage al inicio.
const getInitialLanguage = () => {
  const storedLang = localStorage.getItem("language");
  return storedLang || "es"; // Retorna el idioma guardado o 'es' por defecto.
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage());

  // Sincroniza el idioma del contexto con i18next y localStorage.
  useEffect(() => {
    i18next.changeLanguage(language);
    localStorage.setItem("language", language);
  }, [language]);

  const value = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
