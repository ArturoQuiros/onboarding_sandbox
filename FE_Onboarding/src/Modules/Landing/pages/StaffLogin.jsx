// src/Modules/Landing/pages/StaffLogin.jsx
import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../Global/auth";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../Api/axiosClient"; // tu cliente Axios configurado
import styles from "./StaffLogin.module.css";
import logo from "../../../Global/assets/onboarding_logo.png";

export const StaffLogin = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await instance.loginPopup(loginRequest);
      const token = response.accessToken;

      // Llamada al backend usando axiosClient
      await axiosClient.get("/WS_Onboarding/LogIn", {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/admin");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
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
