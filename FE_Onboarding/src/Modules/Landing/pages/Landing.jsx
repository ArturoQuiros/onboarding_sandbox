// src/Modules/Landing/pages/Landing.jsx
import React from "react";
import { Navbar } from "../components";
import styles from "./Landing.module.css";
import bgImage from "../../../Global/assets/onboarding_bg.jpg";
import logo from "../../../Global/assets/onboarding_logo.png";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <>
      <Navbar />
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <img src={logo} alt="Onboarding Logo" className={styles.logo} />
          <div className={styles.buttonRow}>
            {/* Contenedor del primer botón */}
            <div className={styles.buttonContainer}>
              <p className={styles.buttonText}>¿Eres parte del STAFF?</p>
              <Link to="/staff-login" className={styles.button}>
                Iniciar Sesión
              </Link>
            </div>
            {/* Contenedor del segundo botón */}
            <div className={styles.buttonContainer}>
              <p className={styles.buttonText}>¿Eres Cliente?</p>
              <Link to="/client-login" className={styles.button}>
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
