// src/Admin/pages/Countries.jsx

import React, { useContext } from "react";
import { Navbar, Sidebar, CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import axiosClient from "../../../Api/axiosClient";

import styles from "./Countries.module.css";

export const Countries = () => {
  const { isSidebarOpen } = useContext(UIContext);

  // Obtener datos de la API (ya usa /Pais, que parece ser la correcta)
  const getCountries = async () => {
    try {
      const response = await axiosClient.get("/Pais");
      return response.data.map((country) => ({
        id: country.id,
        name: country.nombre,
      }));
    } catch (error) {
      console.error("Error al obtener países:", error);
      return [];
    }
  };

  // Crear un nuevo país en la API
  const createCountry = async (country) => {
    try {
      const payload = { nombre: country.name };
      const response = await axiosClient.post("/Pais", payload);
      return { id: response.data.id, name: response.data.nombre };
    } catch (error) {
      console.error("Error al crear país:", error);
      throw error; // ✅ Lanza el error
    }
  };

  // Actualizar un país en la API
  const updateCountry = async (country) => {
    try {
      const payload = { id: country.id, nombre: country.name };
      const response = await axiosClient.put(`/Pais/${country.id}`, payload);
      return { id: response.data.id, name: response.data.nombre };
    } catch (error) {
      console.error("Error al actualizar país:", error);
      throw error; // ✅ Lanza el error
    }
  };

  // Eliminar un país de la API
  const deleteCountry = async (id) => {
    try {
      await axiosClient.delete(`/Pais/${id}`);
      return true;
    } catch (error) {
      console.error("Error al eliminar país:", error);
      throw error; // ✅ Lanza el error
    }
  };

  const countryFields = [
    { key: "id", labelKey: "countries.table.id", type: "text" },
    { key: "name", labelKey: "countries.table.name", type: "text" },
  ];

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
            entityName="countries"
            fields={countryFields}
            getItems={getCountries}
            createItem={createCountry}
            updateItem={updateCountry}
            deleteItem={deleteCountry}
          />
        </div>
      </div>
    </div>
  );
};
