// src/Admin/pages/Customers.jsx
import React, { useContext } from "react";
import { Navbar, Sidebar, CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";

import styles from "./Customers.module.css";

export const Customers = () => {
  const { isSidebarOpen } = useContext(UIContext);

  // --- CONFIGURACIÓN ESPECÍFICA PARA CLIENTES ---
  const getCustomers = async () => [
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan.perez@example.com",
      telefono: "555-1234",
      direccion: "Calle Falsa 123",
    },
    {
      id: 2,
      nombre: "María González",
      email: "maria.gonzalez@example.com",
      telefono: "555-5678",
      direccion: "Avenida Siempre Viva 456",
    },
    {
      id: 3,
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@example.com",
      telefono: "555-9012",
      direccion: "Boulevard del Sol 789",
    },
  ];

  const createCustomer = async (customer) => {
    console.log("Creando cliente:", customer);
    return { ...customer, id: Date.now() };
  };

  const updateCustomer = async (customer) => {
    console.log("Actualizando cliente:", customer);
    return customer;
  };

  const deleteCustomer = async (id) => {
    console.log("Eliminando cliente con ID:", id);
    return true;
  };

  const customerFields = [
    { key: "id", labelKey: "customers.table.id", type: "text" },
    { key: "nombre", labelKey: "customers.table.nombre", type: "text" },
    { key: "email", labelKey: "customers.table.email", type: "email" },
    { key: "telefono", labelKey: "customers.table.telefono", type: "text" },
    { key: "direccion", labelKey: "customers.table.direccion", type: "text" },
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
            entityName="customers"
            fields={customerFields}
            getItems={getCustomers}
            createItem={createCustomer}
            updateItem={updateCustomer}
            deleteItem={deleteCustomer}
          />
        </div>
      </div>
    </div>
  );
};
