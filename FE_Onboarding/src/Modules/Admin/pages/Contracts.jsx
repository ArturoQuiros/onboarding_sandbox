// src/Modules/Admin/pages/Contracts.jsx
import React, { useState, useEffect, useContext, useCallback } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsNewspaper } from "react-icons/bs";
import axiosClient from "../../../Api/axiosClient";

const Contracts = () => {
  const { setEntityIcon } = useContext(UIContext);
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setEntityIcon(<BsNewspaper />);
  }, [setEntityIcon]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, usuariosRes] = await Promise.all([
          axiosClient.get("/cliente"),
          axiosClient.get("/usuario"),
        ]);
        setClientes(clientesRes.data);
        setUsuarios(usuariosRes.data);
      } catch (error) {
        console.error("Error cargando clientes o usuarios:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getContracts = useCallback(async () => {
    try {
      const { data: contracts } = await axiosClient.get("/Contrato");

      return contracts.map((c) => ({
        id: c.id,
        client:
          clientes.find((cl) => cl.id === c.id_Cliente)?.nombre || c.id_Cliente,
        status: c.estado,
        accountManager:
          usuarios.find((u) => u.id === c.account_manager)?.nombre ||
          c.account_manager,
        id_Cliente: c.id_Cliente, // para el form
        account_manager: c.account_manager, // para el form
      }));
    } catch (error) {
      console.error("Error al cargar contratos:", error);
      return [];
    }
  }, [clientes, usuarios]);

  const createContract = useCallback(async (contract) => {
    const payload = {
      id_Cliente: contract.id_Cliente,
      estado: contract.status,
      account_manager: contract.account_manager,
    };
    const res = await axiosClient.post("/Contrato", payload);
    return res.data;
  }, []);

  const updateContract = useCallback(async (contract) => {
    const payload = {
      id_Cliente: contract.id_Cliente,
      estado: contract.status,
      account_manager: contract.account_manager,
    };
    const res = await axiosClient.put(`/Contrato/${contract.id}`, payload);
    return res.data;
  }, []);

  const deleteContract = useCallback(async (id) => {
    await axiosClient.delete(`/Contrato/${id}`);
    return true;
  }, []);

  if (isLoading) return <div>Cargando configuración de contratos...</div>;

  const contractFields = [
    { key: "id", labelKey: "contracts.table.id", type: "text" },
    {
      key: "client", // Nombre mostrado en tabla
      formKey: "id_Cliente", // Envía ID al API
      labelKey: "contracts.table.client",
      type: "select",
      options: clientes.map((c) => ({ value: c.id, label: c.nombre })),
      validation: { required: true },
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
      options: usuarios.map((u) => ({ value: u.id, label: u.nombre })),
      validation: { required: true },
    },
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

export default Contracts;
