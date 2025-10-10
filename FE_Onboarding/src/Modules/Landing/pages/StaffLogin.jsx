import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../Global/auth";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../Api/axiosClient";
// 💡 Importar useAuth desde tu barril
import { useAuth } from "../../../Global/Context";
import styles from "./StaffLogin.module.css";
import logo from "../../../Global/assets/onboarding_logo.png";

export const StaffLogin = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 💡 Obtener la función de actualización de usuario del AuthContext
  const { setUser } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      // 1. Iniciar sesión con Azure MSAL
      const response = await instance.loginPopup(loginRequest);
      const token = response.accessToken;
      sessionStorage.setItem("accessToken", token); // Guardar token para Axios

      // 2. Llamada al backend para obtener datos del usuario.
      // Usamos '/WS_Onboarding/LogIn' si tu URL base es solo http://localhost:5005/
      // Si la URL base ya tiene '/WS_Onboarding', usa solo '/LogIn' (como tenías).
      const loginResponse = await axiosClient.get("/LogIn");

      // 3. ✨ GUARDAR LOS DATOS REQUERIDOS EN EL CONTEXT
      // Asumiendo que el backend devuelve { id, nombre, iniciales, rol }
      setUser({
        id: loginResponse.data.id,
        nombre: loginResponse.data.nombre,
        iniciales: loginResponse.data.iniciales,
        rol: loginResponse.data.rol,
      });

      // 4. Redirigir al área protegida
      navigate("/admin");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      // Limpiar token y estado en caso de error
      sessionStorage.removeItem("accessToken");
      setUser(null); // Limpiar el estado global del usuario

      setErrorMsg("No se pudo iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="BDO Logo" className={styles.logo} />
      <h1 className={styles.title}>Inicio de Sesión (Staff)</h1>

      <button
        className={styles.msButton}
        onClick={handleLogin}
        disabled={loading}
      >
        <img
          src="https://static.cdnlogo.com/logos/m/95/microsoft.svg"
          alt="Microsoft"
          className={styles.msLogo}
        />
        {loading ? "Iniciando sesión..." : "Iniciar sesión con Microsoft"}
      </button>

      {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}

      <p className={styles.backLink}>
        <a href="/">Volver a la página principal</a>
      </p>
    </div>
  );
};
