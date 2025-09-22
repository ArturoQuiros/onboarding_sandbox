// src/Admin/pages/Users.jsx
import React, { useContext, useEffect } from "react";
import { Navbar, Sidebar, CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsPeople } from "react-icons/bs";

import styles from "./Users.module.css";

export const Users = () => {
  const { isSidebarOpen, setEntityIcon } = useContext(UIContext);

  // ✅ Setear icono del sidebar y CrudForm
  useEffect(() => {
    setEntityIcon(<BsPeople />);
  }, [setEntityIcon]);

  // --- CONFIGURACIÓN ESPECÍFICA PARA USUARIOS DE AD ---
  const getUsers = async () =>
    Promise.resolve([
      { id: 1, name: "Ana Pérez", role: "Manager", country: "Costa Rica" },
      { id: 2, name: "Luis Gómez", role: "Auditor", country: "México" },
      { id: 3, name: "Sofía Vargas", role: "Staff", country: "Colombia" },
    ]);

  // Estas funciones no implementadas porque se gestionan desde Active Directory
  const createUser = async (user) => {
    console.warn("Creación de usuarios no implementada, se gestiona desde AD.");
    return null;
  };

  const updateUser = async (user) => {
    console.warn(
      "Actualización de usuarios no implementada, se gestiona desde AD."
    );
    return null;
  };

  const deleteUser = async (id) => {
    console.warn(
      "Eliminación de usuarios no implementada, se gestiona desde AD."
    );
    return null;
  };

  const userFields = [
    { key: "id", labelKey: "users.table.id", type: "text" },
    { key: "country", labelKey: "users.table.country", type: "text" },
    { key: "role", labelKey: "users.table.role", type: "text" },
    { key: "name", labelKey: "users.table.name", type: "text" },
  ];
  // ---------------------------------------------

  return (
    <div className={styles.container}>
      <Navbar />
      <Sidebar />
      <div
        className={`${styles.mainContent} ${
          isSidebarOpen ? styles.mainContentOpen : styles.mainContentClosed
        }`}
      >
        <div className={styles.contentWrapper}>
          <CrudDashboard
            entityName="users"
            fields={userFields}
            getItems={getUsers}
            createItem={createUser}
            updateItem={updateUser}
            deleteItem={deleteUser}
          />
        </div>
      </div>
    </div>
  );
};
