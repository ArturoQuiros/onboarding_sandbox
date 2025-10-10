import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../Global/auth";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../Api/axiosClient";
import { useAuth } from "../../../Global/hooks";
import styles from "./StaffLogin.module.css";
import logo from "../../../Global/assets/onboarding_logo.png";

export const StaffLogin = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useAuth();

  /**
   * Maneja el proceso de login:
   * 1. Inicia sesión con Azure MSAL.
   * 2. Obtiene datos del usuario desde el backend.
   * 3. Guarda los datos en el contexto global.
   * 4. Redirige al área protegida.
   */
  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await instance.loginPopup(loginRequest);
      const token = response.accessToken;
      sessionStorage.setItem("accessToken", token);

      const loginResponse = await axiosClient.get("/LogIn");

      setUser({
        id: loginResponse.data.id,
        nombre: loginResponse.data.nombre,
        iniciales: loginResponse.data.iniciales,
        rol: loginResponse.data.rol,
      });

      navigate("/admin");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      sessionStorage.removeItem("accessToken");
      setUser(null);
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
        <a onClick={() => navigate("/")} className={styles.backButton}>
          Volver a la página principal
        </a>
      </p>
    </div>
  );
};
