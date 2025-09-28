import React, { useContext, useEffect } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsGlobeAmericas } from "react-icons/bs";
import axiosClient from "../../../Api/axiosClient";

export const Countries = () => {
  const { setEntityIcon, entityIcon } = useContext(UIContext);

  useEffect(() => {
    setEntityIcon(<BsGlobeAmericas />);
  }, [setEntityIcon]);

  // Trae los países y mapea solo id y nombre
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
      const payload = { nombre: country.name };
      const response = await axiosClient.post("/Pais", payload);
      return { id: response.data.id, name: response.data.nombre };
    } catch (error) {
      console.error("Error al crear país:", error);
      throw error;
    }
  };

  const updateCountry = async (country) => {
    try {
      const payload = { id: country.id, nombre: country.name };
      const response = await axiosClient.put(`/Pais/${country.id}`, payload);
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
