// src/Global/components/Navbar/Navbar.jsx
import React from "react";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <header className={styles.header}>
      <img
        src="https://cdn.bdo.global/images/bdo_logo/1.0.0/bdo_logo_color.png"
        alt="BDO logo"
        className={styles.logo}
      />
      <h1 className={styles.title}>Costa Rica</h1>
    </header>
  );
};
