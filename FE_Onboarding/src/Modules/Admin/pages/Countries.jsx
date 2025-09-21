// src/Admin/pages/Countries.jsx
import React, { useContext } from "react";
import { Navbar, Sidebar, CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";

// Importa el archivo de estilos modulares
import styles from "./Countries.module.css";

export const Countries = () => {
  const { isSidebarOpen } = useContext(UIContext);

  // --- CONFIGURACIÓN ESPECÍFICA PARA PAÍSES ---
  const getCountries = async () => [
    { id: 1, name: "Costa Rica" },
    { id: 2, name: "México" },
    { id: 3, name: "Colombia" },
  ];

  const createCountry = async (country) => {
    console.log("Creando país:", country);
    return { ...country, id: Date.now() };
  };

  const updateCountry = async (country) => {
    console.log("Actualizando país:", country);
    return country;
  };

  const deleteCountry = async (id) => {
    console.log("Eliminando país con ID:", id);
    return true;
  };

  const countryFields = [
    { key: "id", labelKey: "countries.table.id", type: "text" },
    { key: "name", labelKey: "countries.table.name", type: "text" },
  ];
  // ---------------------------------------------

  return (
    // Aplica las clases de 'styles'
    <div className={styles.container}>
      <Navbar />
      <Sidebar />
      <div
        className={`${styles.mainContent} ${
          isSidebarOpen ? styles.mainContentOpen : styles.mainContentClosed
        }`}
      >
        <CrudDashboard
          entityName="countries"
          fields={countryFields}
          getItems={getCountries}
          createItem={createCountry}
          updateItem={updateCountry}
          deleteItem={deleteCountry}
        />
      </div>
    </div>
  );
};
