import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../Api/axiosClient";
// 💡 Importar la función para registrar el handler de error 401
import { setUnauthorizedHandler } from "./";

// 1. Crear el Context
const AuthContext = createContext();

// =======================================================
// 💡 EL CUSTOM HOOK useAuth
// =======================================================
/**
 * Hook para acceder al estado de autenticación (usuario, rol, funciones).
 * Es el que usarás en todos tus componentes.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// =======================================================
// 2. El Proveedor (Provider) que gestiona la lógica
// =======================================================
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función de Logout: limpia la sesión, el estado y redirige
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setUser(null);
    // Redirección suave usando navigate del hook
    navigate("/staff-login");
  };

  // Función que el interceptor de Axios llamará (a través del puente)
  const handleUnauthorized = () => {
    console.warn("Token expirado o inválido. Realizando logout.");
    logout();
  };

  // Inicialización y registro de handlers
  useEffect(() => {
    // CRUCIAL: 🔌 Registrar el handler de error para Axios.
    // Esto crea el "puente" entre este componente React y el archivo plano axiosClient.js.
    setUnauthorizedHandler(handleUnauthorized);

    const checkAuth = async () => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        try {
          // Intenta obtener los datos del usuario con el token existente
          const response = await axiosClient.get("/LogIn");

          // Si es exitoso, guarda los datos en el estado global
          setUser({
            id: response.data.id,
            nombre: response.data.nombre,
            iniciales: response.data.iniciales,
            rol: response.data.rol,
          });
        } catch (error) {
          // Si falla (ej: 401), limpia la sesión
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]); // navigate en dependencias para buena práctica

  const contextValue = {
    // Estados esenciales
    isAuthenticated: !!user,
    loading,

    // Datos del usuario (disponibles en toda la app)
    user,
    nombre: user?.nombre,
    iniciales: user?.iniciales,
    rol: user?.rol,

    // Funciones (para login/logout en cualquier componente)
    setUser, // Usado en StaffLogin.jsx
    logout, // Usado en Navbar.jsx (botón de cerrar sesión)
  };

  // Mientras el token se verifica, mostramos un estado de carga
  if (loading) {
    return <div>Verificando sesión...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
