// src/Admin/pages/Contracts.jsx
import React, { useContext, useEffect } from "react";
import { Navbar, Sidebar, CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsNewspaper } from "react-icons/bs"; // Icono del sidebar

import styles from "./Contracts.module.css";

export const Contracts = () => {
  const { isSidebarOpen, setEntityIcon } = useContext(UIContext);

  // ✅ Setear icono del sidebar para el CrudForm
  useEffect(() => {
    setEntityIcon(<BsNewspaper />);
  }, [setEntityIcon]);

  // --- CONFIGURACIÓN ESPECÍFICA PARA CONTRATOS ---
  const getContracts = async () =>
    Promise.resolve([
      { id: 1, country: "Costa Rica", customer: "Juan Pérez" },
      { id: 2, country: "México", customer: "María González" },
      { id: 3, country: "Colombia", customer: "Carlos Rodríguez" },
    ]);

  const createContract = async (contract) => {
    console.log("Creando contrato:", contract);
    return { ...contract, id: Date.now() };
  };

  const updateContract = async (contract) => {
    console.log("Actualizando contrato:", contract);
    return contract;
  };

  const deleteContract = async (id) => {
    console.log("Eliminando contrato con ID:", id);
    return true;
  };

  // --- Campos del formulario con validaciones ---
  const contractFields = [
    { key: "id", labelKey: "contracts.table.id", type: "text" },
    {
      key: "country",
      labelKey: "contracts.table.country",
      type: "text",
      validation: { required: true, minLength: 3, maxLength: 50 },
    },
    {
      key: "customer",
      labelKey: "contracts.table.customer",
      type: "text",
      validation: { required: true, minLength: 3, maxLength: 100 },
    },
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
            entityName="contracts"
            fields={contractFields}
            getItems={getContracts}
            createItem={createContract}
            updateItem={updateContract}
            deleteItem={deleteContract}
          />
        </div>
      </div>
    </div>
  );
};
