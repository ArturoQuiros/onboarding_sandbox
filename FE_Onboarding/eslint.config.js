import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Ignorar automáticamente carpetas o archivos globales
  globalIgnores(["dist", "node_modules"]),

  {
    // Archivos a los que se aplica esta configuración
    files: ["**/*.{js,jsx}"],

    // Configuraciones base recomendadas
    extends: [
      js.configs.recommended, // Reglas recomendadas de ESLint
      reactHooks.configs["recommended-latest"], // Reglas recomendadas para hooks de React
      reactRefresh.configs.vite, // Integración con Vite y React Refresh
    ],

    languageOptions: {
      ecmaVersion: "latest", // Última versión de ECMAScript
      globals: globals.browser, // Variables globales del navegador
      parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: { jsx: true }, // Soporte para JSX
        sourceType: "module", // Módulos ES
      },
    },

    rules: {
      // Evita variables no usadas, pero ignora aquellas que empiezan con mayúscula o _
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],

      // Mejor práctica: habilitar hooks exhaustivos
      "react-hooks/exhaustive-deps": "warn",

      // Opcional: permite console.warn y console.error pero bloquea console.log
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
]);
