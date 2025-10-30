// src/Modules/Landing/pages/Landing.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import logo from "../../../Global/assets/onboarding_logo.png";

/**
 * Landing page con fondo animado que cambia cada cierto tiempo
 */
export const Landing = () => {
  const [currentBg, setCurrentBg] = useState(0);

  const backgrounds = [
    "/assets/bg1.jpg",
    "/assets/bg2.jpg",
    "/assets/bg3.jpg",
    "/assets/bg4.jpg",
    "/assets/bg5.jpg",
    "/assets/bg6.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <div className={styles.landingContainer}>
      {/* Capa de imágenes de fondo */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`${styles.backgroundLayer} ${
            index === currentBg ? styles.active : ""
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      {/* Overlay oscuro para mejorar legibilidad */}
      <div className={styles.overlay} />

      {/* Contenido */}
      <div className={styles.content}>
        <img src={logo} alt="Onboarding Logo" className={styles.logo} />
        <div className={styles.buttonRow}>
          <div className={styles.buttonContainer}>
            <p className={styles.buttonText}>Are you a member of the Staff?</p>
            <Link to="/staff-login" className={styles.button}>
              Access Portal
            </Link>
          </div>
          <div className={styles.buttonContainer}>
            <p className={styles.buttonText}>Are you a Client?</p>
            <Link to="/client-login" className={styles.button}>
              Access Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
