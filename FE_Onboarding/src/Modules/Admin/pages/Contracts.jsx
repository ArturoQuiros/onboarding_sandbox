// src/Admin/pages/Contracts.jsx
import React, { useContext } from "react";
import { Navbar, Sidebar, CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";

import styles from "./Contracts.module.css";

export const Contracts = () => {
  const { isSidebarOpen } = useContext(UIContext);

  // --- CONFIGURACIÓN ESPECÍFICA PARA CONTRATOS ---
  const getContracts = async () => [
    { id: 1, country: "Costa Rica", customer: "Juan Pérez" },
    { id: 2, country: "México", customer: "María González" },
    { id: 3, country: "Colombia", customer: "Carlos Rodríguez" },
  ];

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

  const contractFields = [
    { key: "id", labelKey: "contracts.table.id", type: "text" },
    { key: "country", labelKey: "contracts.table.country", type: "text" },
    { key: "customer", labelKey: "contracts.table.customer", type: "text" },
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
