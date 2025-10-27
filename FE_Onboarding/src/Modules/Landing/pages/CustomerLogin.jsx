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
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await axiosClient.post("/User/Outside/Login", {
        email,
        contrasena: password,
      });

      if (response.data && response.data.token) {
        login(response.data, response.data.token);
        navigate("/client/contract/1", { replace: true });
      } else {
        setErrors({ general: "Unexpected server response" });
        setLoading(false);
      }
    } catch (err) {
      console.error("Customer login error:", err);
      setLoading(false);

      // Manejo de errores basado solo en códigos HTTP (no confiar en mensajes del BE)
      if (err.response?.status === 401) {
        setErrors({ general: "Invalid email or password" });
      } else if (err.request) {
        // Error de red - no hubo respuesta
        setErrors({
          general: "Unable to connect to server. Please check your connection.",
        });
      } else {
        // Error en la configuración de la petición
        setErrors({ general: "An error occurred. Please try again." });
      }
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
      <img src={logo} alt="BDO Logo" className={styles.logo} />
      <h1 className={styles.title}>
        {showReset ? "Reset Password" : "Client Login"}
      </h1>

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
