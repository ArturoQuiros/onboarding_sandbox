// src/Modules/Admin/components/StaffLogin.jsx
import React, { useState, useEffect } from "react";
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
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const handleRedirect = async () => {
      setLoading(true);
      try {
        const response = await instance.handleRedirectPromise();
        if (response) {
          const token = response.accessToken;
          const email = response.account?.username;

          if (!email) {
            throw new Error(
              "No se pudo obtener el correo electrónico del usuario."
            );
          }

          // Guardar token y email en sessionStorage para persistencia
          sessionStorage.setItem("accessToken", token);
          sessionStorage.setItem("userEmail", email);

          // Login inicial con email (sin token de Authorization)
          const loginResponse = await axiosClient.post(
            "/User/Inside/LogIn",
            { email: email },
            {
              headers: {
                Authorization: undefined, // Quitar el token para este endpoint
              },
            }
          );

          // Si el backend devuelve su propio token, úsalo en lugar del de Microsoft
          if (loginResponse.data.token) {
            sessionStorage.setItem("accessToken", loginResponse.data.token);
          }

          login(loginResponse.data);
          navigate("/admin");
        }
      } catch (error) {
        console.error(
          "Error al procesar el redirect o al hacer login en API:",
          error
        );
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("userEmail");
        setErrorMsg(
          "No se pudo iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    handleRedirect();
  }, [instance, navigate, login]);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMsg("No se pudo iniciar sesión. Intenta nuevamente.");
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
