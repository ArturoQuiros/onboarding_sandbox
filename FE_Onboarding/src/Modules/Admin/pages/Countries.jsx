// src/Modules/Admin/pages/Countries.jsx
import React, { useContext, useEffect } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsGlobeAmericas } from "react-icons/bs";
import axiosClient from "../../../Api/axiosClient";

/**
 * Página de países.
 * Permite gestionar países: crear, actualizar, eliminar y listar.
 */
const Countries = () => {
  const { setEntityIcon } = useContext(UIContext);

  // Establece el ícono de la página en el sidebar
  useEffect(() => {
    setEntityIcon(<BsGlobeAmericas />);
  }, [setEntityIcon]);

  // Funciones CRUD para la entidad País
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

  const createCountry = async (country) => {
    try {
      const response = await axiosClient.post("/Pais", {
        nombre: country.name,
      });
      return { id: response.data.id, name: response.data.nombre };
    } catch (error) {
      console.error("Error al crear país:", error);
      throw error;
    }
  };

  const updateCountry = async (country) => {
    try {
      const response = await axiosClient.put(`/Pais/${country.id}`, {
        id: country.id,
        nombre: country.name,
      });
      return { id: response.data.id, name: response.data.nombre };
    } catch (error) {
      console.error("Error al actualizar país:", error);
      throw error;
    }
  };

  const deleteCountry = async (id) => {
    try {
      await axiosClient.delete(`/Pais/${id}`);
      return true;
    } catch (error) {
      console.error("Error al eliminar país:", error);
      throw error;
    }
  };

  // Configuración de campos y validaciones para CrudForm
  const countryFields = [
    { key: "id", labelKey: "countries.table.id", type: "text" },
    { key: "name", labelKey: "countries.table.name", type: "text" },
  ];

  const countryValidations = {
    name: (value) => {
      if (!value) return "El nombre es obligatorio";
      if (value.length < 3) return "Debe tener al menos 3 caracteres";
      if (value.length > 50) return "No puede superar 50 caracteres";
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value))
        return "Solo se permiten letras y espacios";
      return null;
    },
  };

  return (
    <CrudDashboard
      entityName="countries"
      fields={countryFields}
      getItems={getCountries}
      createItem={createCountry}
      updateItem={updateCountry}
      deleteItem={deleteCountry}
      validations={countryValidations}
    />
  );
};

export default Countries;
