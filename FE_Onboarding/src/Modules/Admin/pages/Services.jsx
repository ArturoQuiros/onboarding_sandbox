// src/Admin/pages/Services.jsx
import React, { useContext, useEffect } from "react";
import { Navbar, Sidebar, CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsTools } from "react-icons/bs";

import styles from "./Services.module.css";

export const Services = () => {
  const { isSidebarOpen, setEntityIcon } = useContext(UIContext);

  // ✅ Setear icono del sidebar y CrudForm
  useEffect(() => {
    setEntityIcon(<BsTools />);
  }, [setEntityIcon]);

  // --- CONFIGURACIÓN ESPECÍFICA PARA SERVICIOS ---
  const getServices = async () =>
    Promise.resolve([
      { id: 1, name: "Consultoría de Negocios", country: "Costa Rica" },
      { id: 2, name: "Auditoría Financiera", country: "México" },
      { id: 3, name: "Asesoría Fiscal", country: "Colombia" },
    ]);

  const createService = async (service) => {
    console.log("Creando servicio:", service);
    return { ...service, id: Date.now() };
  };

  const updateService = async (service) => {
    console.log("Actualizando servicio:", service);
    return service;
  };

  const deleteService = async (id) => {
    console.log("Eliminando servicio con ID:", id);
    return true;
  };

  const serviceFields = [
    { key: "id", labelKey: "services.table.id", type: "text" },
    { key: "name", labelKey: "services.table.name", type: "text" },
    { key: "country", labelKey: "services.table.country", type: "text" },
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
            entityName="services"
            fields={serviceFields}
            getItems={getServices}
            createItem={createService}
            updateItem={updateService}
            deleteItem={deleteService}
          />
        </div>
      </div>
    </div>
  );
};
