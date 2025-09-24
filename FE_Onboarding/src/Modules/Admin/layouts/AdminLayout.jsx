import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../components";
import { UIContext } from "../../../Global/Context";
import styles from "./AdminLayout.module.css";

const AdminLayout = () => {
  const { isSidebarOpen } = useContext(UIContext);

  return (
    <div
      className={`${styles.pageLayout} ${
        isSidebarOpen ? styles.open : styles.closed
      }`}
    >
      <Navbar />
      <Sidebar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
