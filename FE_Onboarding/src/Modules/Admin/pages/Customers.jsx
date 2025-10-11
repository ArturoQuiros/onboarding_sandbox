// src/Modules/Admin/pages/Customers.jsx
import React, { useContext, useEffect, useMemo } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsPerson } from "react-icons/bs";
import { useCustomersQuery } from "../hooks";

const Customers = () => {
  const { setEntityIcon } = useContext(UIContext);

  const { customersQuery, createCustomer, updateCustomer, deleteCustomer } =
    useCustomersQuery();

  useEffect(() => {
    setEntityIcon(<BsPerson />);
  }, [setEntityIcon]);

  // ✅ Define campos y validaciones con useMemo (antes de returns condicionales)
  const customerFields = useMemo(
    () => [
      { key: "id", labelKey: "customers.table.id", type: "text" },
      { key: "name", labelKey: "customers.table.name", type: "text" },
      { key: "email", labelKey: "customers.table.email", type: "email" },
      { key: "phone", labelKey: "customers.table.phone", type: "text" },
      { key: "address", labelKey: "customers.table.address", type: "text" },
    ],
    []
  );

  const customerValidations = useMemo(
    () => ({
      name: (value) => {
        if (!value) return "El nombre es obligatorio";
        if (value.length < 3) return "Debe tener al menos 3 caracteres";
        if (value.length > 50) return "No puede superar 50 caracteres";
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value))
          return "Solo se permiten letras y espacios";
        return null;
      },
      email: (value) => {
        if (!value) return "El email es obligatorio";
        if (!/\S+@\S+\.\S+/.test(value)) return "El email no es válido";
        return null;
      },
      phone: (value) => {
        if (!value) return "El teléfono es obligatorio";
        if (!/^\d{8}$/.test(value))
          return "El teléfono debe tener 8 dígitos numéricos";
        return null;
      },
      address: (value) => {
        if (!value) return "La dirección es obligatoria";
        if (value.length < 5)
          return "La dirección debe tener al menos 5 caracteres";
        return null;
      },
    }),
    []
  );

  // ✅ Returns condicionales DESPUÉS de todos los hooks
  if (customersQuery.isLoading) return <p>Cargando clientes...</p>;
  if (customersQuery.isError) return <p>Error cargando clientes</p>;

  return (
    <CrudDashboard
      entityName="customers"
      fields={customerFields}
      getItems={() => customersQuery.data ?? []}
      createItem={createCustomer.mutateAsync}
      updateItem={updateCustomer.mutateAsync}
      deleteItem={deleteCustomer.mutateAsync}
      validations={customerValidations}
    />
  );
};

export default Customers;
