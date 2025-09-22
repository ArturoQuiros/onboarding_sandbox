import React, { useContext } from "react";
import { Navbar, Sidebar } from "../components";
import { UIContext } from "../../../Global/Context";
import styles from "./AdminLayout.module.css";

export const AdminLayout = ({ children }) => {
  const { isSidebarOpen } = useContext(UIContext);

  return (
    <div className={styles.container}>
      <Navbar />
      <Sidebar />
      <main
        className={`${styles.mainContent} ${
          isSidebarOpen ? styles.mainContentOpen : styles.mainContentClosed
        }`}
      >
        {children}
      </main>
    </div>
  );
};
