import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

// 💡 Contextos globales
import {
  LanguageProvider,
  UIProvider,
  StaffAuthProvider,
  CustomerAuthProvider,
} from "./Global/Context";
import { enTranslation, esTranslation } from "./Global/Translations";

// 💡 MSAL (Azure AD)
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./Global/auth";

// 💡 React Query
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./Api"; // si usas el barrel file de api

// 🌐 Inicialización de i18next
i18next.init({
  interpolation: { escapeValue: false },
  resources: {
    es: { global: enTranslation },
    en: { global: esTranslation },
  },
});

const msalInstance = new PublicClientApplication(msalConfig);

// 🚀 Render principal
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <MsalProvider instance={msalInstance}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <StaffAuthProvider>
              <CustomerAuthProvider>
                <LanguageProvider>
                  <UIProvider>
                    <App />
                  </UIProvider>
                </LanguageProvider>
              </CustomerAuthProvider>
            </StaffAuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </MsalProvider>
    </I18nextProvider>
  </StrictMode>
);
