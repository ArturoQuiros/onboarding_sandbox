// src/Global/authHooks.js

// Almacena la referencia a la función de manejo de errores 401 del Context.
// Esta variable es esencial para el patrón de inyección.
let unauthorizedHandler = null;

/**
 * Registra la función de logout con redirección (obtenida del AuthProvider).
 * Solo se llama UNA SOLA VEZ al inicio de la aplicación.
 */
export const setUnauthorizedHandler = (handlerFn) => {
  unauthorizedHandler = handlerFn;
};

/**
 * Ejecuta la lógica de logout y navegación suave.
 * Es llamada por el interceptor de Axios cuando recibe un 401.
 */
export const handle401Error = () => {
  if (unauthorizedHandler) {
    // Llama a la función que fue inyectada desde el AuthProvider (la que usa useNavigate).
    unauthorizedHandler();
  } else {
    // Fallback: Si el handler no está listo, forzamos la recarga.
    console.error(
      "Error: Auth handler not initialized. Forcing hard redirect."
    );
    window.location.href = "/staff-login";
  }
};
