import React, { useContext, useEffect } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsPeople } from "react-icons/bs";

// Ya no se necesitan Navbar, Sidebar ni el módulo de estilos local
// import { Navbar, Sidebar } from "../components";
// import styles from "./Users.module.css";

export const Users = () => {
  // Solo se necesita el setEntityIcon del contexto
  const { setEntityIcon } = useContext(UIContext);

  // Setea el ícono del sidebar para el CrudForm
  useEffect(() => {
    setEntityIcon(<BsPeople />);
  }, [setEntityIcon]);

  // --- CONFIGURACIÓN ESPECÍFICA PARA USUARIOS DE AD ---
  const getUsers = async () =>
    Promise.resolve([
      { id: 1, name: "Ana Pérez", role: "Manager", country: "Costa Rica" },
      { id: 2, name: "Luis Gómez", role: "Auditor", country: "México" },
      { id: 3, name: "Sofía Vargas", role: "Users", country: "Colombia" },
    ]);

  // Estas funciones no están implementadas porque se gestionan desde Active Directory
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
    { key: "id", labelKey: "Users.table.id", type: "text" },
    { key: "country", labelKey: "Users.table.country", type: "text" },
    { key: "role", labelKey: "Users.table.role", type: "text" },
    { key: "name", labelKey: "Users.table.name", type: "text" },
  ];
  // ---------------------------------------------

  return (
    <CrudDashboard
      entityName="Users"
      fields={userFields}
      getItems={getUsers}
      createItem={createUser}
      updateItem={updateUser}
      deleteItem={deleteUser}
    />
  );
};
