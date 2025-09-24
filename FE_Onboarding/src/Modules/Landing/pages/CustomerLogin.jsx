// src/Modules/Customer/pages/CustomerLogin.jsx
import React, { useState } from "react";
import styles from "./CustomerLogin.module.css";
import { Link } from "react-router-dom";
import logo from "../../../Global/assets/onboarding_logo.png";
import bgImage from "../../../Global/assets/onboarding_bg.jpg";

export const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);

  // Hardcode para pruebas
  const hardcodedEmail = "client@bdo.cr";
  const hardcodedPassword = "password123";

  const validateForm = () => {
    let formErrors = {};

    if (!email) {
      formErrors.email = "El correo es obligatorio";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formErrors.email = "Formato de correo inválido";
      }
    }

    if (!password) {
      formErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 8) {
      formErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (email === hardcodedEmail && password === hardcodedPassword) {
      alert("¡Inicio de sesión exitoso!");
    } else {
      setErrors({ general: "Correo o contraseña incorrectos" });
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    let resetErrors = {};
    if (!resetEmail) {
      resetErrors.resetEmail = "Debe ingresar un correo válido";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(resetEmail)) {
        resetErrors.resetEmail = "Formato de correo inválido";
      }
    }

    if (Object.keys(resetErrors).length > 0) {
      setErrors(resetErrors);
      return;
    }

    alert(`Se ha enviado un enlace de restablecimiento a: ${resetEmail}`);
    setShowReset(false);
    setResetEmail("");
  };

  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className={styles.overlay}></div>
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
                required
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
                required
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
                required
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
    </div>
  );
};
