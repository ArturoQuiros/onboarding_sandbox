// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

// Importa ambos proveedores de contexto
import { LanguageProvider, UIProvider } from "./Global/Context";
import { enTranslation, esTranslation } from "./Global/Translations";

i18next.init({
  interpolation: { escapeValue: false },
  resources: {
    es: { global: enTranslation },
    en: { global: esTranslation },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <LanguageProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </LanguageProvider>
      </BrowserRouter>
    </I18nextProvider>
  </StrictMode>
);
