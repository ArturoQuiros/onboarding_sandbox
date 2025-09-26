import React, { useContext, useEffect } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsNewspaper } from "react-icons/bs";

export const Contracts = () => {
  const { setEntityIcon } = useContext(UIContext);

  useEffect(() => {
    setEntityIcon(<BsNewspaper />);
  }, [setEntityIcon]);

  // --- CONTRACT-SPECIFIC CONFIGURATION ---
  const getContracts = async () =>
    Promise.resolve([
      { id: 1, country: "Costa Rica", customer: "Juan Pérez" },
      { id: 2, country: "México", customer: "María González" },
      { id: 3, country: "Colombia", customer: "Carlos Rodríguez" },
    ]);

  const createContract = async (contract) => {
    console.log("Creando contrato:", contract);
    return { ...contract, id: Date.now() };
  };

  const updateContract = async (contract) => {
    console.log("Actualizando contrato:", contract);
    return contract;
  };

  const deleteContract = async (id) => {
    console.log("Eliminando contrato con ID:", id);
    return true;
  };

  const contractFields = [
    { key: "id", labelKey: "contracts.table.id", type: "text" },
    {
      key: "country",
      labelKey: "contracts.table.country",
      type: "text",
      validation: { required: true, minLength: 3, maxLength: 50 },
    },
    {
      key: "customer",
      labelKey: "contracts.table.customer",
      type: "text",
      validation: { required: true, minLength: 3, maxLength: 100 },
    },
  ];
  // ---------------------------------------------

  return (
    <CrudDashboard
      entityName="contracts"
      fields={contractFields}
      getItems={getContracts}
      createItem={createContract}
      updateItem={updateContract}
      deleteItem={deleteContract}
    />
  );
};
