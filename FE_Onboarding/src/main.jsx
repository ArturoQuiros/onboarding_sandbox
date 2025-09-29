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

// MSAL
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./Global/auth"; // desde tu barril

i18next.init({
  interpolation: { escapeValue: false },
  resources: {
    es: { global: enTranslation },
    en: { global: esTranslation },
  },
});

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <MsalProvider instance={msalInstance}>
        <BrowserRouter>
          <LanguageProvider>
            <UIProvider>
              <App />
            </UIProvider>
          </LanguageProvider>
        </BrowserRouter>
      </MsalProvider>
    </I18nextProvider>
  </StrictMode>
);
