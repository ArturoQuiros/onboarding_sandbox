import React, { useContext, useEffect, useMemo } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsList, BsTools } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // Importación de navegación
import { useServicesQuery } from "../hooks";
import styles from "../components/CrudDataTable.module.css";

const Services = () => {
  const { setEntityIcon } = useContext(UIContext);
  const navigate = useNavigate(); // Inicialización de navegación

  const {
    servicesQuery,
    createService,
    updateService,
    deleteService,
    countriesQuery,
  } = useServicesQuery();

  // Establece el ícono en el sidebar al montar
  useEffect(() => {
    setEntityIcon(<BsTools />);
  }, [setEntityIcon]);

  // Campos del formulario/tabla (memoizados)
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

  // Retornos condicionales por estado de carga/error
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

  // Renderizador para la acción extra (Ver Tareas)
  const extraActionRenderer = (item) => (
    <button
      onClick={() => navigate(`/admin/services/${item.id}/tasks`)}
      className={styles.extraActionButton}
      title="Ver Tareas"
    >
      <BsList />
    </button>
  );

  return (
    <CrudDashboard
      entityName="services"
      fields={serviceFields}
      getItems={() => servicesQuery.data ?? []}
      createItem={createService.mutateAsync}
      updateItem={updateService.mutateAsync}
      deleteItem={deleteService.mutateAsync}
      extraActionRenderer={extraActionRenderer}
    />
  );
};

export default Services;
