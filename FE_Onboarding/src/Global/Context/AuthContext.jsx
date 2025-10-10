import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../Api/axiosClient";
// 💡 IMPORTACIÓN CRÍTICA: Conecta este Context con el módulo plano
import { setUnauthorizedHandler } from "../hooks/authHooks"; // Asegúrate de que esta ruta sea correcta: src/Global/hooks/authHooks

// 1. Crear el Context
const AuthContext = createContext();

// 2. Custom Hook para usar el contexto (useAuth)
/**
 * Hook para acceder al estado de autenticación (usuario, rol, funciones).
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// 3. Crear el Proveedor (AuthProvider)
export const AuthProvider = ({ children }) => {
  // Estado para la información del usuario
  const [user, setUser] = useState(null); // Estado de carga (útil para mostrar un spinner mientras se verifica el token)

  const [loading, setLoading] = useState(true); // Hook para la navegación suave

  const navigate = useNavigate(); // Función de Logout: limpia la sesión y redirige

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setUser(null);
    navigate("/staff-login"); // Redirección suave al login
  }; // Función que el interceptor de Axios llamará en caso de 401

  const handleUnauthorized = () => {
    console.warn("Token expirado o inválido. Realizando logout.");
    logout();
  }; // Función de inicialización: se ejecuta una vez para verificar la sesión existente

  useEffect(() => {
    // 🔌 PASO CRÍTICO: Registra la función de manejo de error 401 en el módulo plano.
    // Esto es lo que permite que el interceptor de Axios (fuera de React) llame a 'logout()'.
    setUnauthorizedHandler(handleUnauthorized);

    const checkAuth = async () => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await axiosClient.get("/LogIn");

          setUser({
            id: response.data.id,
            nombre: response.data.nombre,
            iniciales: response.data.iniciales,
            rol: response.data.rol,
          });
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]); // Añadimos 'navigate' como dependencia // 4. Valores que se proveen al resto de la aplicación

  const contextValue = {
    // Información de autenticación
    isAuthenticated: !!user,
    loading, // Datos del usuario

    user,
    nombre: user?.nombre,
    iniciales: user?.iniciales,
    rol: user?.rol, // Funciones de control

    setUser,
    logout, // 🛑 handleUnauthorized ya NO se expone aquí. Solo se usa internamente y por el puente.
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {/* Si está cargando, puedes mostrar un spinner aquí */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
