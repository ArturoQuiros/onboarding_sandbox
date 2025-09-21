// src/Modules/Landing/pages/Landing.jsx
import React from "react";
import { Navbar } from "../components";
import styles from "./Landing.module.css";
import bgImage from "../../../Global/assets/onboarding_bg.jpg";
import logo from "../../../Global/assets/onboarding_logo.png";

export const Landing = () => {
  return (
    <>
      <Navbar />
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className={styles.overlay}></div>
        <img src={logo} alt="Onboarding Logo" className={styles.logo} />
      </div>
    </>
  );
};
