import React, { useState } from "react";
import styles from "./CustomerLogin.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../Global/assets/onboarding_logo.png";
import axiosClient from "../../../Api/axiosClient";
import { useCustomerAuth } from "../../../Global/Context";

export const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useCustomerAuth();
  const navigate = useNavigate();

  // Validate login form
  const validateLoginForm = () => {
    const formErrors = {};
    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Validate reset password form
  const validateResetForm = () => {
    const formErrors = {};
    if (!resetEmail.trim()) {
      formErrors.resetEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      formErrors.resetEmail = "Invalid email format";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // 🔹 LOGIN
  // 🔹 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // 1. Petición de Login
      const loginResponse = await axiosClient.post("/User/Outside/Login", {
        email,
        contrasena: password,
      });
      if (loginResponse.data && loginResponse.data.token) {
        const userData = loginResponse.data;
        login(userData, userData.token);

        // ASUNCION: El ID del usuario externo está en la propiedad 'idUsuario' (ajustar si es diferente)
        const idUsuarioExterno = userData.usuariosExternos.id;

        if (idUsuarioExterno) {
          // 2. OBTENER EL/LOS CONTRATO(S) ASOCIADO(S)
          const contractsResponse = await axiosClient.get(
            `/Contrato/ByUsuarioExterno?IdUsuarioExterno=${idUsuarioExterno}`
          );

          if (contractsResponse.data && contractsResponse.data.length > 0) {
            // 3. Tomar el ID del primer contrato (asumiendo que el cliente solo tiene uno o queremos el primero)
            const contractId = contractsResponse.data[0].id;

            // 4. Navegar a ese contrato específico
            navigate(`/client/contract/${contractId}`, { replace: true });

            // ¡TODO COMPLETADO!
            return; // Salir de la función después de la navegación exitosa
          } else {
            // Caso: Usuario loggeado, pero sin contratos encontrados.
            setErrors({ general: "Login successful, but no contracts found." });
            // Puedes decidir navegar a una página de "Sin contratos" o mantener al usuario en el login.
          }
        } else {
          setErrors({
            general:
              "No contracts available for this user, contact your Account Manager.",
          });
        }
      } else {
        setErrors({ general: "Unexpected server response or missing token" });
      }
    } catch (err) {
      console.error("Customer login error:", err);

      if (err.response?.status === 401) {
        setErrors({ general: "Invalid email or password" });
      } else if (err.request) {
        setErrors({
          general: "Unable to connect to server. Please check your connection.",
        });
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    } finally {
      // Solo deshabilitar la carga si no hubo una navegación exitosa.
      // Si la navegación fue exitosa (dentro del if(contractsResponse...)), la carga se mantiene en true hasta el redirect.
      setLoading(false);
    }
  };

  // 🔹 RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validateResetForm()) return;

    setLoading(true);
    setErrors({});

    try {
      await axiosClient.post(
        `/User/Outside/Password/Recover/${encodeURIComponent(resetEmail)}`
      );

      // Mensaje de éxito genérico (no revela si el email existe o no)
      setErrors({
        resetEmail: `A new password has been sent to your email.`,
        success: true,
      });
      setResetEmail("");
    } catch (err) {
      console.error("Password reset error:", err);

      // Mensaje genérico por seguridad (no revela si el email existe)
      setErrors({
        resetEmail: `A new password has been sent to your email.`,
        success: true,
      });
      setResetEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.logo}
        src="/onboarding_logo_black.png"
        alt="BDO Black Logo"
      />

      {!showReset ? (
        <form className={styles.form} onSubmit={handleLogin}>
          {errors.general && (
            <p className={styles.errorMessage}>{errors.general}</p>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="example@email.com"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="********"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleResetPassword}>
          <p className={styles.resetDescription}>
            Enter your email address and we'll send you a new password if an
            account exists.
          </p>

          <div className={styles.inputGroup}>
            <label htmlFor="resetEmail">Email</label>
            <input
              type="email"
              id="resetEmail"
              value={resetEmail}
              placeholder="example@email.com"
              autoComplete="email"
              onChange={(e) => setResetEmail(e.target.value)}
              disabled={loading}
            />
            {errors.resetEmail && (
              <p
                className={
                  errors.success ? styles.successMessage : styles.errorMessage
                }
              >
                {errors.resetEmail}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send New Password"}
          </button>

          <button
            type="button"
            className={`${styles.submitButton} ${styles.secondaryButton}`}
            onClick={() => {
              setShowReset(false);
              setErrors({});
            }}
            disabled={loading}
          >
            Back to Login
          </button>
        </form>
      )}

      {!showReset && (
        <button
          type="button"
          className={styles.forgotPassword}
          onClick={() => {
            setShowReset(true);
            setErrors({});
          }}
          disabled={loading}
        >
          Forgot your password?
        </button>
      )}

      <Link to="/" className={styles.backLink}>
        Back to Home
      </Link>
    </div>
  );
};
