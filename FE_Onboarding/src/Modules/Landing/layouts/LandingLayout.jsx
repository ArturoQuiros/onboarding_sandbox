// src/Modules/Landing/layouts/LandingLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import styles from "./LandingLayout.module.css";
import bgImage from "../../../Global/assets/onboarding_bg.jpg";

export const LandingLayout = () => {
  return (
    <>
      <Navbar />
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
