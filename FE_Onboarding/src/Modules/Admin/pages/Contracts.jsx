// src/Modules/Admin/pages/Contracts.jsx

import React, { useContext, useEffect, useMemo } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsNewspaper, BsTools } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styles from "../components/CrudDataTable.module.css";
// Importar el hook de contratos que creamos
import { useContractsQuery } from "../hooks";

const Contracts = () => {
  const { setEntityIcon } = useContext(UIContext);
  const navigate = useNavigate();

  // 1. Usar el hook de React Query para obtener datos y mutaciones
  const {
    contractsQuery,
    customersQuery,
    internalUsersQuery, // De donde vienen los Account Managers
    createContract,
    updateContract,
    deleteContract,
  } = useContractsQuery();

  // Establece el ícono en el sidebar
  useEffect(() => {
    setEntityIcon(<BsNewspaper />);
  }, [setEntityIcon]);

  // 2. Mapeo de campos del formulario (depende de clientes y usuarios)
  const contractFields = useMemo(() => {
    const clientes = customersQuery.data ?? [];
    const usuarios = internalUsersQuery.data ?? [];

    return [
      {
        key: "id",
        labelKey: "contracts.table.id",
        type: "text",
        isReadOnly: true,
        isHidden: false,
      },
      {
        key: "client",
        formKey: "id_Cliente",
        labelKey: "contracts.table.client",
        type: "select",
        // Usamos la data de clientes. El valor es el ID, la etiqueta es el nombre (c.name)
        options: clientes.map((c) => ({ value: c.id, label: c.name })),
        validation: { required: true },
        isReadOnly: (item) => !!item, // Bloquea al editar
      },
      {
        key: "status",
        labelKey: "contracts.table.status",
        type: "select",
        options: [
          { value: "Activo", label: "Activo" },
          { value: "Pendiente", label: "Pendiente" },
          { value: "Cancelado", label: "Cancelado" },
        ],
        validation: { required: true },
      },
      {
        key: "accountManager",
        formKey: "account_manager",
        labelKey: "contracts.table.accountManager",
        type: "select",
        // Usamos la data de usuarios internos. El valor es el ID, la etiqueta es el nombre (u.name)
        options: usuarios.map((u) => ({ value: u.id, label: u.name })),
        validation: { required: true },
      },
    ];
  }, [customersQuery.data, internalUsersQuery.data]);

  // 3. Validaciones
  const contractValidations = useMemo(
    () => ({
      id_Cliente: (value) => (!value ? "Debe seleccionar un cliente" : null),
      status: (value) => (!value ? "Debe seleccionar un estado" : null),
      account_manager: (value) =>
        !value ? "Debe seleccionar un Account Manager" : null,
    }),
    []
  );

  // 4. Acción extra: ver servicios de contrato
  const extraActionRenderer = (item) => (
    <button
      onClick={() => navigate(`/admin/contracts/${item.id}/services`)}
      className={styles.extraActionButton}
      title="Ver Servicios"
    >
      <BsTools />
    </button>
  );

  // 5. Renderizado condicional de carga y error (Combinando todas las queries)
  const isLoading =
    contractsQuery.isLoading ||
    customersQuery.isLoading ||
    internalUsersQuery.isLoading;
  const isError =
    contractsQuery.isError ||
    customersQuery.isError ||
    internalUsersQuery.isError;

  if (isLoading) return <div>Cargando configuración de contratos...</div>;

  if (isError) return <div>Error cargando datos de contratos.</div>;

  return (
    <CrudDashboard
      entityName="contracts"
      fields={contractFields}
      // Pasamos los datos del hook
      getItems={() => contractsQuery.data ?? []}
      // Pasamos las funciones de mutación
      createItem={createContract.mutateAsync}
      updateItem={updateContract.mutateAsync}
      deleteItem={deleteContract.mutateAsync}
      validations={contractValidations}
      extraActionRenderer={extraActionRenderer}
      initialFormValues={{
        status: "Activo",
        id_Cliente: null,
        account_manager: null,
      }}
    />
  );
};

export default Contracts;
