// src/Modules/Admin/pages/Contracts.jsx
import React, { useContext, useEffect } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsNewspaper } from "react-icons/bs";
import axiosClient from "../../../Api/axiosClient";

export const Contracts = () => {
  const { setEntityIcon } = useContext(UIContext);

  useEffect(() => {
    setEntityIcon(<BsNewspaper />);
  }, [setEntityIcon]);

  // --- API CALLS ---
  const getContracts = async () => {
    try {
      const [contractsRes, clientsRes, usersRes] = await Promise.all([
        axiosClient.get("/Contrato"),
        axiosClient.get("/cliente"),
        axiosClient.get("/usuario"),
      ]);

      const contracts = contractsRes.data;
      const clients = clientsRes.data;
      const users = usersRes.data;

      return contracts.map((c) => ({
        id: c.id,
        cliente: clients.find((cl) => cl.id === c.id_Cliente)?.nombre || "N/A",
        accountManager:
          users.find((u) => u.id === c.account_manager)?.nombre || "N/A",
        estado: c.estado,
      }));
    } catch (error) {
      console.error("Error al obtener contratos:", error);
      return [];
    }
  };

  const createContract = async (contract) => {
    try {
      const res = await axiosClient.post("/Contrato", contract);
      return res.data;
    } catch (error) {
      console.error("Error al crear contrato:", error);
      throw error;
    }
  };

  const updateContract = async (contract) => {
    try {
      const res = await axiosClient.put(`/Contrato/${contract.id}`, contract);
      return res.data;
    } catch (error) {
      console.error("Error al actualizar contrato:", error);
      throw error;
    }
  };

  const deleteContract = async (id) => {
    try {
      await axiosClient.delete(`/Contrato/${id}`);
      return true;
    } catch (error) {
      console.error("Error al eliminar contrato:", error);
      return false;
    }
  };

  // --- TABLE FIELDS (sin fechas de auditoría) ---
  const contractFields = [
    { key: "id", labelKey: "contracts.table.id", type: "text" },
    { key: "cliente", labelKey: "contracts.table.client", type: "text" },
    {
      key: "accountManager",
      labelKey: "contracts.table.accountManager",
      type: "text",
    },
    { key: "estado", labelKey: "contracts.table.estado", type: "text" },
  ];

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
