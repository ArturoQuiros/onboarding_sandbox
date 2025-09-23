import React, { useContext, useEffect } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsTools } from "react-icons/bs";

// No need to import Navbar, Sidebar, or the local CSS module

export const Services = () => {
  // We still need to use useContext to set the entity icon
  const { setEntityIcon } = useContext(UIContext);

  // Set sidebar and CRUD form icon
  useEffect(() => {
    setEntityIcon(<BsTools />);
  }, [setEntityIcon]);

  // --- SERVICE-SPECIFIC CONFIGURATION ---
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
