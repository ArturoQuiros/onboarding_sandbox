import React, { useContext, useEffect } from "react";
import { UIContext } from "../../../Global/Context";
import { BsLayers } from "react-icons/bs";
import { ContractServiceDashboard } from "../components";

export const ContractServices = () => {
  const { setEntityIcon } = useContext(UIContext);

  useEffect(() => {
    // Establece el ícono de la entidad en la UI global
    setEntityIcon(<BsLayers />);
  }, [setEntityIcon]);

  // Renderiza el componente dashboard que contiene toda la lógica de la página
  return <ContractServiceDashboard />;
};
