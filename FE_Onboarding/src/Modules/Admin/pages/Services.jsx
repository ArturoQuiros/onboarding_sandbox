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

export const Services = () => {
  const { setEntityIcon, entityIcon } = useContext(UIContext);

  const [countriesList, setCountriesList] = useState([]);
  const [countryMap, setCountryMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // --- FUNCIÓN DE CARGA Y MAPEADO DE PAÍSES ---
  const fetchCountries = async () => {
    try {
      const { data: countries } = await axiosClient.get("/Pais");

      const map = countries.reduce((acc, country) => {
        acc[country.id] = country.nombre;
        return acc;
      }, {});
      setCountryMap(map);

      const list = countries.map((country) => ({
        value: country.id,
        label: country.nombre,
      }));
      setCountriesList(list);
    } catch (error) {
      console.error("Error al cargar la lista de países:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setEntityIcon(<BsTools />);
    fetchCountries();
  }, [setEntityIcon]);

  // Definición de Campos
  const serviceFields = useMemo(
    () => [
      {
        key: "id",
        labelKey: "services.table.id",
        type: "text",
        isReadOnly: true,
        isHidden: true,
      },
      {
        key: "country",
        labelKey: "services.table.country",
        type: "select",
        options: countriesList,
      },
      { key: "name", labelKey: "services.table.name", type: "text" },
    ],
    [countriesList]
  );

  // --- Operaciones CRUD (optimizadas con useCallback) ---

  const getServices = useCallback(async () => {
    // 🚩 IMPORTANTE: Ya no se llama a fetchCountries aquí.
    // Confiamos en que el useEffect inicial ya lo hizo.
    try {
      const { data: services } = await axiosClient.get("/Servicio");

      return services.map((service) => ({
        id: service.id,
        name: service.nombre,
        country: countryMap[service.id_pais] || "Desconocido",
        id_pais: service.id_pais,
      }));
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      return [];
    }
  }, [countryMap]); // Depende del mapa de países

  const createService = useCallback(
    async (item) => {
      const payload = {
        nombre: item.name,
        id_pais: item.country,
      };

      try {
        const { data: newService } = await axiosClient.post(
          "/Servicio",
          payload
        );

        return {
          id: newService.id,
          name: newService.nombre,
          country: countryMap[newService.id_pais] || "Desconocido",
          id_pais: newService.id_pais,
        };
      } catch (error) {
        console.error("Error al crear servicio:", error);
        throw error;
      }
    },
    [countryMap]
  ); // Depende del mapa de países

  const updateService = useCallback(
    async (item) => {
      const payload = {
        id: item.id,
        nombre: item.name,
        id_pais: item.country,
      };

      try {
        await axiosClient.put(`/Servicio/${item.id}`, payload);

        return {
          id: item.id,
          name: item.name,
          country: countryMap[item.country] || "Desconocido",
          id_pais: item.country,
        };
      } catch (error) {
        console.error("Error al actualizar servicio:", error);
        throw error;
      }
    },
    [countryMap]
  ); // Depende del mapa de países

  const deleteService = useCallback(async (id) => {
    try {
      await axiosClient.delete(`/Servicio/${id}`);
      return true;
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
      throw error;
    }
  }, []);

  const initialFormValues = { name: "", country: "" };

  if (isLoading) {
    return <div>Cargando configuración de servicios...</div>;
  }

  return (
    <CrudDashboard
      entityName="services"
      entityIcon={entityIcon}
      fields={serviceFields}
      getItems={getServices}
      createItem={createService}
      updateItem={updateService}
      deleteItem={deleteService}
      initialFormValues={initialFormValues}
    />
  );
};
