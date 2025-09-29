// src/auth/authConfig.js

/**
 * Configuración de MSAL para React (UiApp)
 */
export const msalConfig = {
  auth: {
    clientId: "dc0c79e0-3d8a-43c8-b24b-b85ba53f9be7", // UiApp Application Id
    authority:
      "https://login.microsoftonline.com/2775bd27-efe2-4412-b22e-8fea18e0dbb0", // Tenant ID
    redirectUri: "http://localhost:5173", // URL donde corre tu frontend
  },
  cache: {
    cacheLocation: "sessionStorage", // o "localStorage"
    storeAuthStateInCookie: false,
  },
};

/**
 * Scopes que React va a pedir para el backend (Onboarding_Backend)
 * Formato: api://<ApplicationId_del_backend>/<scope_definido_en_AzureAD>
 */
export const loginRequest = {
  scopes: ["api://authenticar_dbo_onboarding/access_as_user"], // ← URI correcto
};
