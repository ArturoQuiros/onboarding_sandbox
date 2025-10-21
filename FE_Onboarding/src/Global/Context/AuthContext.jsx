// src/Global/AuthContext.jsx

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
    sessionStorage.removeItem("userEmail");
    setUser(null);
    navigate("/");
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      await axiosClient.post("/LogOut");
    } catch (error) {
      console.error("Error al cerrar sesión en servidor:", error);
    } finally {
      clientLogout();
    }
  }, [clientLogout]);

  // ÚNICA FUNCIÓN DE MAPEO Y ASIGNACIÓN DE USUARIO
  const login = useCallback((userData) => {
    setUser({
      id: userData.id,
      nombre: userData.nombre,
      email: userData.email,
      puesto: userData.puesto,
      id_Rol: userData.id_Rol,
      id_Pais: userData.id_Pais,
      estado: userData.estado,
      azure_AD_User_Id: userData.azure_AD_User_Id,
      fecha_Creacion: userData.fecha_Creacion,
      fecha_Modificacion: userData.fecha_Modificacion,
    });
  }, []);

  const handleUnauthorized = useCallback(() => clientLogout(), [clientLogout]);

  useEffect(() => {
    setUnauthorizedHandler(handleUnauthorized);

    const checkAuth = async () => {
      const token = sessionStorage.getItem("accessToken");
      const email = sessionStorage.getItem("userEmail");

      if (token && email) {
        try {
          // Enviar el email en el body para revalidar la sesión
          // NO enviar el token de Authorization porque este endpoint no lo requiere
          const response = await axiosClient.post(
            "/User/Inside/LogIn",
            { email: email },
            {
              headers: {
                Authorization: undefined, // Quitar el token para este endpoint
              },
            }
          );

          if (response.data && response.data.id) {
            login(response.data); // Usa la función centralizada
          } else {
            clientLogout();
          }
        } catch (e) {
          console.error("Error al verificar sesión persistente:", e);
          clientLogout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [handleUnauthorized, clientLogout, login]);

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        Verificando sesión...
      </div>
    );

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
