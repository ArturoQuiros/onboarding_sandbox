// src/Modules/Admin/pages/Services.jsx
import React, { useContext, useEffect, useMemo } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsTools } from "react-icons/bs";
import { useServicesQuery } from "../hooks";

const Services = () => {
  const { setEntityIcon } = useContext(UIContext);

  const {
    servicesQuery,
    createService,
    updateService,
    deleteService,
    countriesQuery,
  } = useServicesQuery();

  // Establece el ícono en el sidebar
  useEffect(() => {
    setEntityIcon(<BsTools />);
  }, [setEntityIcon]);

  // ✅ Mapear campos SIEMPRE (antes de cualquier return condicional)
  const serviceFields = useMemo(() => {
    const countries = countriesQuery.data ?? [];
    return [
      { key: "id", labelKey: "services.table.id", type: "text" },
      {
        key: "countryName",
        formKey: "id_pais",
        labelKey: "services.table.country",
        type: "select",
        options: countries.map((c) => ({
          value: c.id,
          label: c.nombre || c.name,
        })),
        validation: { required: true },
        isReadOnly: (item) => !!item,
      },
      {
        key: "name",
        labelKey: "services.table.name",
        type: "text",
        validation: { required: true },
      },
    ];
  }, [countriesQuery.data]);

  // ✅ Ahora sí, retornos condicionales DESPUÉS de todos los hooks
  if (servicesQuery.isLoading || countriesQuery.isLoading) {
    return <div>Cargando servicios...</div>;
  }

  if (servicesQuery.isError || countriesQuery.isError) {
    return (
      <div>
        Error cargando servicios o países
        {servicesQuery.error && <p>{servicesQuery.error.message}</p>}
        {countriesQuery.error && <p>{countriesQuery.error.message}</p>}
      </div>
    );
  }

  return (
    <CrudDashboard
      entityName="services"
      fields={serviceFields}
      getItems={() => servicesQuery.data ?? []}
      createItem={createService.mutateAsync}
      updateItem={updateService.mutateAsync}
      deleteItem={deleteService.mutateAsync}
    />
  );
};

export default Services;
