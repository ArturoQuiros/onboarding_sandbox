// src/Modules/Admin/pages/ContractServices.jsx
import React, { useContext, useEffect } from "react";
import { UIContext } from "../../../Global/Context";
import { BsLayers } from "react-icons/bs";
import { ContractServiceDashboard } from "../components";

/**
 * Página de servicios asociados a contratos.
 * Muestra un dashboard para gestionar la relación entre contratos y servicios.
 */
const ContractServices = () => {
  const { setEntityIcon } = useContext(UIContext);

  // Establece el ícono de la página en el sidebar
  useEffect(() => {
    setEntityIcon(<BsLayers />);
  }, [setEntityIcon]);

  // Renderiza el dashboard principal de la entidad
  return <ContractServiceDashboard />;
};

export default ContractServices;
