// src/Modules/Admin/pages/Staff.jsx

import React, { useContext, useEffect, useMemo } from "react";
import { UIContext } from "../../../Global/Context";
import { BsPeople } from "react-icons/bs";
import { StaffDashboard } from "../components/StaffDashboard";
import { useTranslation } from "react-i18next";

/**
 * Página de Staff.
 * Renderiza el dashboard del staff y establece el ícono correspondiente.
 */
const Staff = () => {
  const { t } = useTranslation("global");
  const { setEntityIcon } = useContext(UIContext); // Establece el ícono de la página en la UI global

  useEffect(() => {
    setEntityIcon(<BsPeople />);
  }, [setEntityIcon]); // Definición de campos de datos. // Excluimos 'roleName' y 'enabled' ya que la tabla los maneja con componentes especiales.

  const staffFields = useMemo(
    () => [
      { key: "name", label: t("staffDashboard.table.name"), sortable: true },
      { key: "email", label: t("staffDashboard.table.email"), sortable: true },
      {
        key: "puesto",
        label: t("staffDashboard.table.position"),
        sortable: true,
      },
      {
        key: "countryName",
        label: t("staffDashboard.table.country"),
        sortable: true,
      },
    ],
    [t] // Dependencia de t para asegurar la actualización al cambiar el idioma
  ); // Pasamos 'fields' al StaffDashboard

  return <StaffDashboard fields={staffFields} />;
};

export default Staff;
