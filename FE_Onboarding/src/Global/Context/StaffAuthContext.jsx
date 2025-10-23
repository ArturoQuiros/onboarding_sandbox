// src/Global/Context/StaffAuthContext.jsx

import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../Api/axiosClient";
import { setUnauthorizedHandler } from "../hooks/authHooks";

export const StaffAuthContext = React.createContext(null);

// Hook personalizado exportado desde el mismo archivo
export const useStaffAuth = () => {
  const context = useContext(StaffAuthContext);
  if (!context) {
    throw new Error("useStaffAuth debe usarse dentro de StaffAuthProvider");
  }
  return context;
};

export const StaffAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const clientLogout = useCallback(() => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userType");
    setUser(null);
    navigate("/staff-login");
  }, [navigate]);

  const logout = useCallback(() => {
    clientLogout();
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
    sessionStorage.setItem("userType", "staff");
  }, []);

  const handleUnauthorized = useCallback(() => clientLogout(), [clientLogout]);

  useEffect(() => {
    setUnauthorizedHandler(handleUnauthorized);

    const checkAuth = async () => {
      const token = sessionStorage.getItem("accessToken");
      const email = sessionStorage.getItem("userEmail");
      const userType = sessionStorage.getItem("userType");

      // Solo verificar si es un usuario staff
      if (token && email && userType === "staff") {
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
          console.error("Error al verificar sesión de staff:", e);
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
        Verificando sesión de staff...
      </div>
    );

  return (
    <StaffAuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthenticated: !!user,
        userType: "staff",
      }}
    >
      {children}
    </StaffAuthContext.Provider>
  );
};
