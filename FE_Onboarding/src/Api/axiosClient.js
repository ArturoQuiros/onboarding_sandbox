import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_ONBOARDING_API, // <-- CAMBIO AQUÍ
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
