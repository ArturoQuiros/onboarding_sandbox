import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../Api/axiosClient";
import { setUnauthorizedHandler } from "../hooks/authHooks";

export const CustomerAuthContext = React.createContext(null);

// Hook personalizado
export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error(
      "useCustomerAuth debe usarse dentro de CustomerAuthProvider"
    );
  }
  return context;
};

export const CustomerAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Cierre de sesión
  const clientLogout = useCallback(() => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("userType");
    setUser(null);
    navigate("/", { replace: true });
  }, [navigate]);

  const logout = useCallback(() => {
    clientLogout();
  }, [clientLogout]);

  // 🔹 Inicio de sesión (guardar datos y token)
  const login = useCallback((userData, token) => {
    const u = userData.usuariosExternos || userData;

    const userObj = {
      id: u.id,
      nombre: u.nombre,
      email: u.email,
      estado: u.estado,
      id_Rol: u.id_Rol,
      id_Cliente: u.id_Cliente,
      fecha_Creacion: u.fecha_Creacion,
      fecha_Modificacion: u.fecha_Modificacion,
    };

    setUser(userObj);

    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("userEmail", u.email);
    sessionStorage.setItem("userData", JSON.stringify(userObj));
    sessionStorage.setItem("userType", "client");
  }, []);

  const handleUnauthorized = useCallback(() => clientLogout(), [clientLogout]);

  // 🔹 Verificar sesión persistente
  useEffect(() => {
    setUnauthorizedHandler(handleUnauthorized);

    const token = sessionStorage.getItem("accessToken");
    const userType = sessionStorage.getItem("userType");
    const storedUser = sessionStorage.getItem("userData");

    if (token && userType === "client" && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // 🧩 OPCIONAL: Validar token con el backend (si el endpoint existe)
        /*
        axiosClient
          .get("/User/Outside/ValidateToken", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log("Token validado:", res.data);
          })
          .catch((err) => {
            console.warn("Token inválido o expirado:", err);
            clientLogout();
          });
        */
      } catch (err) {
        console.error("Error al leer usuario almacenado:", err);
        clientLogout();
      }
    }

    setLoading(false);
  }, [handleUnauthorized, clientLogout]);

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        Verificando sesión del cliente...
      </div>
    );

  return (
    <CustomerAuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthenticated: !!user,
        userType: "client",
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
};
