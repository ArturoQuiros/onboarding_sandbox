// src/Modules/Customer/pages/CustomerLogin.jsx
import React, { useState } from "react";
import styles from "./CustomerLogin.module.css";
import { Link } from "react-router-dom";
import logo from "../../../Global/assets/onboarding_logo.png";

export const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);

  // Hardcode para pruebas
  const hardcodedEmail = "client@bdo.cr";
  const hardcodedPassword = "password123";

  const validateLoginForm = () => {
    let formErrors = {};

    // Validar email
    if (!email.trim()) {
      formErrors.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Formato de correo inválido";
    }

    // Validar password
    if (!password.trim()) {
      formErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      formErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const validateResetForm = () => {
    let formErrors = {};

    if (!resetEmail.trim()) {
      formErrors.resetEmail = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      formErrors.resetEmail = "Formato de correo inválido";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    if (email === hardcodedEmail && password === hardcodedPassword) {
      alert("✅ Login exitoso");
    } else {
      setErrors({ general: "Credenciales incorrectas" });
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!validateResetForm()) return;

    alert(`📧 Enlace de recuperación enviado a ${resetEmail}`);
    setShowReset(false);
    setResetEmail("");
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="BDO Logo" className={styles.logo} />
      <h1 className={styles.title}>
        {showReset ? "Restablecer Contraseña" : "Inicio de Sesión (Cliente)"}
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
              placeholder="ejemplo@correo.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password}</p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleResetPassword}>
          <div className={styles.inputGroup}>
            <label htmlFor="resetEmail">Correo electrónico</label>
            <input
              type="email"
              id="resetEmail"
              value={resetEmail}
              placeholder="ejemplo@correo.com"
              onChange={(e) => setResetEmail(e.target.value)}
            />
            {errors.resetEmail && (
              <p className={styles.errorMessage}>{errors.resetEmail}</p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Enviar enlace
          </button>
          <button
            type="button"
            className={`${styles.submitButton} ${styles.secondaryButton}`}
            onClick={() => setShowReset(false)}
          >
            Volver al login
          </button>
        </form>
      )}

      {!showReset && (
        <button
          type="button"
          className={styles.forgotPassword}
          onClick={() => setShowReset(true)}
        >
          ¿Olvidaste tu contraseña?
        </button>
      )}

      <Link to="/" className={styles.backLink}>
        Volver a la página principal
      </Link>
    </div>
  );
};
