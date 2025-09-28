import React from "react";
import styles from "./StaffLogin.module.css";
import { Link } from "react-router-dom";
import logo from "../../../Global/assets/onboarding_logo.png";

export const StaffLogin = () => {
  return (
    <div className={styles.container}>
      <img src={logo} alt="BDO Logo" className={styles.logo} />
      <h1 className={styles.title}>Inicio de Sesión (Staff)</h1>

      {/* Placeholder: cuadro blanco para futuro login con AD */}
      <div className={styles.placeholderBox}>
        <p>🔒 Aquí irá el login con Active Directory</p>
      </div>

      <Link to="/" className={styles.backLink}>
        Volver a la página principal
      </Link>
    </div>
  );
};
