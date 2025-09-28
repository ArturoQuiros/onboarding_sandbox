import React, { useContext, useEffect } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsPerson } from "react-icons/bs";
import axiosClient from "../../../Api/axiosClient";

export const Customers = () => {
  const { setEntityIcon, entityIcon } = useContext(UIContext);

  useEffect(() => {
    setEntityIcon(<BsPerson />);
  }, [setEntityIcon]);

  // --- CONFIGURACIÓN ESPECÍFICA PARA CLIENTES ---
  const getCustomers = async () => {
    try {
      const response = await axiosClient.get("/Cliente");
      return response.data.map((customer) => ({
        id: customer.id,
        name: customer.nombre,
        email: customer.email,
        phone: customer.telefono,
        address: customer.direccion,
      }));
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      return [];
    }
  };

  const createCustomer = async (customer) => {
    try {
      const payload = {
        nombre: customer.name,
        email: customer.email,
        telefono: customer.phone,
        direccion: customer.address,
      };
      const response = await axiosClient.post("/Cliente", payload);
      return {
        id: response.data.id,
        name: response.data.nombre,
        email: response.data.email,
        phone: response.data.telefono,
        address: response.data.direccion,
      };
    } catch (error) {
      console.error("Error al crear cliente:", error);
      throw error;
    }
  };

  const updateCustomer = async (customer) => {
    try {
      const payload = {
        id: customer.id,
        nombre: customer.name,
        email: customer.email,
        telefono: customer.phone,
        direccion: customer.address,
      };
      const response = await axiosClient.put(
        `/Cliente/${customer.id}`,
        payload
      );
      return {
        id: response.data.id,
        name: response.data.nombre,
        email: response.data.email,
        phone: response.data.telefono,
        address: response.data.direccion,
      };
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      throw error;
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await axiosClient.delete(`/Cliente/${id}`);
      return true;
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      throw error;
    }
  };

  const customerFields = [
    { key: "id", labelKey: "customers.table.id", type: "text" },
    { key: "name", labelKey: "customers.table.name", type: "text" },
    { key: "email", labelKey: "customers.table.email", type: "email" },
    { key: "phone", labelKey: "customers.table.phone", type: "text" },
    { key: "address", labelKey: "customers.table.address", type: "text" },
  ];

  const customerValidations = {
    name: (value) => {
      if (!value) return "El nombre es obligatorio";
      if (value.length < 3) return "Debe tener al menos 3 caracteres";
      if (value.length > 50) return "No puede superar 50 caracteres";
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value))
        return "Solo se permiten letras y espacios";
      return null;
    },
    email: (value) => {
      if (!value) return "El email es obligatorio";
      if (!/\S+@\S+\.\S+/.test(value)) return "El email no es válido";
      return null;
    },
    phone: (value) => {
      if (!value) return "El teléfono es obligatorio";
      // Asume que la API acepta 8 dígitos numéricos, si no, puedes cambiar la validación.
      if (!/^\d{8}$/.test(value))
        return "El teléfono debe tener 8 dígitos numéricos";
      return null;
    },
    address: (value) => {
      if (!value) return "La dirección es obligatoria";
      if (value.length < 5)
        return "La dirección debe tener al menos 5 caracteres";
      return null;
    },
  };
  // ---------------------------------------------

  return (
    <CrudDashboard
      entityName="customers"
      fields={customerFields}
      getItems={getCustomers}
      createItem={createCustomer}
      updateItem={updateCustomer}
      deleteItem={deleteCustomer}
      validations={customerValidations}
    />
  );
};
