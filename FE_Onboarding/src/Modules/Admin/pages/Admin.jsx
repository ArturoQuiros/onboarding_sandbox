// src/Modules/Admin/pages/Admin.jsx
import React, { useContext } from "react";
import { Navbar, Sidebar } from "../components";
import { UIContext } from "../../../Global/Context";
import styles from "./Admin.module.css";

export const Admin = () => {
  const { isSidebarOpen } = useContext(UIContext);

  const mainContentClasses = isSidebarOpen
    ? styles.mainContent
    : `${styles.mainContent} ${styles.mainContentShifted}`;

  return (
    <div className={styles.container}>
      <Navbar />
      <Sidebar />
      <div className={mainContentClasses}>
        <h1>ADM Dashboard</h1>
        <p>Aquí irá eventualmente un dashboard de ADM.</p>
      </div>
    </div>
  );
};
