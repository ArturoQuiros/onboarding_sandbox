// src/Modules/Landing/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import logo from "../../../Global/assets/onboarding_logo.png";

export const Landing = () => {
  return (
    <>
      <img src={logo} alt="Onboarding Logo" className={styles.logo} />
      <div className={styles.buttonRow}>
        <div className={styles.buttonContainer}>
          <p className={styles.buttonText}>¿Eres parte del STAFF?</p>
          <Link to="/staff-login" className={styles.button}>
            Iniciar Sesión
          </Link>
        </div>
        <div className={styles.buttonContainer}>
          <p className={styles.buttonText}>¿Eres Cliente?</p>
          <Link to="/client-login" className={styles.button}>
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </>
  );
};
