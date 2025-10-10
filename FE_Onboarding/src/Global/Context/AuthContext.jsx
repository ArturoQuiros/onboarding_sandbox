import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../Api/axiosClient";
import { setUnauthorizedHandler } from "../hooks/authHooks";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const clientLogout = useCallback(() => {
    sessionStorage.removeItem("accessToken");
    setUser(null);
    navigate("/staff-login");
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      await axiosClient.get("/LogOut");
    } catch (error) {
      console.error("Error al cerrar sesión en servidor:", error);
    } finally {
      clientLogout();
    }
  }, [clientLogout]);

  const handleUnauthorized = useCallback(() => clientLogout(), [clientLogout]);

  useEffect(() => {
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
        } catch {
          clientLogout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [handleUnauthorized, clientLogout]);

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        Verificando sesión...
      </div>
    );

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
