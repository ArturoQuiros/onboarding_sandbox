import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsTools } from "react-icons/bs";
import axiosClient from "../../../Api/axiosClient";

const Services = () => {
  const { setEntityIcon } = useContext(UIContext);
  const [countriesList, setCountriesList] = useState([]);
  const [countryMap, setCountryMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchCountries = async () => {
    try {
      const { data: countries } = await axiosClient.get("/Pais");
      const map = countries.reduce((acc, country) => {
        acc[country.id] = country.nombre;
        return acc;
      }, {});
      setCountryMap(map);
      setCountriesList(
        countries.map((c) => ({ value: c.id, label: c.nombre }))
      );
    } catch (error) {
      console.error("Error al cargar países:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setEntityIcon(<BsTools />);
    fetchCountries();
  }, [setEntityIcon]);

  // --- Campos para CrudForm ---
  const serviceFields = useMemo(
    () => [
      { key: "id", labelKey: "services.table.id", type: "text" },
      {
        key: "countryName", // para mostrar en tabla
        formKey: "id_pais", // clave correcta para API
        labelKey: "services.table.country",
        type: "select",
        options: countriesList,
        validation: { required: true },
      },
      {
        key: "name",
        labelKey: "services.table.name",
        type: "text",
        validation: { required: true },
      },
    ],
    [countriesList]
  );

  // --- Funciones CRUD ---
  const getServices = useCallback(async () => {
    try {
      const { data: services } = await axiosClient.get("/Servicio");
      return services.map((s) => ({
        id: s.id,
        name: s.nombre,
        countryName: countryMap[s.id_pais] || "Desconocido",
        id_pais: s.id_pais,
      }));
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      return [];
    }
  }, [countryMap]);

  const createService = useCallback(
    async (item) => {
      const payload = { nombre: item.name, id_pais: item.id_pais };
      const { data: newService } = await axiosClient.post("/Servicio", payload);
      return {
        id: newService.id,
        name: newService.nombre,
        countryName: countryMap[newService.id_pais] || "Desconocido",
        id_pais: newService.id_pais,
      };
    },
    [countryMap]
  );

  const updateService = useCallback(
    async (item) => {
      const payload = { id: item.id, nombre: item.name, id_pais: item.id_pais };
      await axiosClient.put(`/Servicio/${item.id}`, payload);
      return {
        id: item.id,
        name: item.name,
        countryName: countryMap[item.id_pais] || "Desconocido",
        id_pais: item.id_pais,
      };
    },
    [countryMap]
  );

  const deleteService = useCallback(async (id) => {
    await axiosClient.delete(`/Servicio/${id}`);
    return true;
  }, []);

  if (isLoading) return <div>Cargando configuración de servicios...</div>;

  return (
    <CrudDashboard
      entityName="services"
      fields={serviceFields}
      getItems={getServices}
      createItem={createService}
      updateItem={updateService}
      deleteItem={deleteService}
    />
  );
};

export default Services;
