// src/Modules/Admin/pages/Staff.jsx
import React, { useContext, useEffect } from "react";
import { UIContext } from "../../../Global/Context";
import { BsPeople } from "react-icons/bs";
import { StaffDashboard } from "../components/StaffDashboard";

/**
 * Página de Staff.
 * Renderiza el dashboard del staff y establece el ícono correspondiente.
 */
const Staff = () => {
  const { setEntityIcon } = useContext(UIContext);

  // Establece el ícono de la página en la UI global
  useEffect(() => {
    setEntityIcon(<BsPeople />);
  }, [setEntityIcon]);

  return <StaffDashboard />;
};

export default Staff;
