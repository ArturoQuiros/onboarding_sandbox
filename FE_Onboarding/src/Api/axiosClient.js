import axios from "axios";
// 💡 Importar el handler para el 401 que usa el navigate del Context
import { handle401Error } from "../Global/hooks";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_ONBOARDING_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================================================
// 🔑 INTERCEPTOR DE PETICIONES (REQUEST)
// Añade el token Bearer a TODAS las peticiones salientes
// =======================================================
axiosClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =======================================================
// 🚫 INTERCEPTOR DE RESPUESTAS (RESPONSE)
// Maneja el error 401 (No Autorizado/Token Expirado)
// =======================================================
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error; // Si la API responde con un 401 (Unauthorized)
    if (response && response.status === 401) {
      // 💡 Llamamos a la función puente, que ejecutará el logout() suave del Context
      handle401Error();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
