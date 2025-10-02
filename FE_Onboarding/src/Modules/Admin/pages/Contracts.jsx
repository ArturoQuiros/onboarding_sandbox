// src/Modules/Admin/pages/Contracts.jsx
import React, { useState, useEffect, useContext, useCallback } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsNewspaper, BsTools } from "react-icons/bs";
import axiosClient from "../../../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import styles from "../components/CrudDataTable.module.css";

/**
 * Página de contratos.
 */
const Contracts = () => {
  const { setEntityIcon } = useContext(UIContext);
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setEntityIcon(<BsNewspaper />);
  }, [setEntityIcon]);

  // Carga clientes y usuarios
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
        console.error("Error cargando clientes o usuarios", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- CRUD Functions ---
  const getContracts = useCallback(async () => {
    try {
      const res = await axiosClient.get("/Contrato");
      return res.data.map((c) => ({
        id: c.id,
        client:
          clientes.find((cl) => cl.id === c.id_Cliente)?.nombre || c.id_Cliente,
        status: c.estado,
        accountManager:
          usuarios.find((u) => u.id === c.account_manager)?.nombre ||
          c.account_manager,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [clientes, usuarios]);

  const createContract = useCallback(async (contract) => {
    const payload = {
      id_Cliente: contract.id_Cliente,
      estado: contract.status,
      account_manager: contract.accountManager,
    };
    try {
      const res = await axiosClient.post("/Contrato", payload);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const updateContract = useCallback(async (contract) => {
    const payload = {
      id_Cliente: contract.id_Cliente,
      estado: contract.status,
      account_manager: contract.accountManager,
    };
    try {
      const res = await axiosClient.put(`/Contrato/${contract.id}`, payload);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const deleteContract = useCallback(async (id) => {
    try {
      await axiosClient.delete(`/Contrato/${id}`);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  // --- Campos para CrudForm / DataTable ---
  const contractFields = [
    {
      key: "id",
      labelKey: "contracts.table.id",
      type: "text",
      isReadOnly: true,
      isHidden: true,
    },
    {
      key: "client",
      formKey: "id_Cliente",
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

  // --- Acción extra: ver servicios de contrato ---
  const extraActionRenderer = (item) => (
    <button
      onClick={() => navigate(`/admin/contracts/${item.id}/services`)}
      className={styles.extraActionButton}
      title="Ver Servicios"
    >
      <BsTools />
    </button>
  );

  if (isLoading) return <div>Cargando configuración de contratos...</div>;

  return (
    <CrudDashboard
      entityName="contracts"
      fields={contractFields}
      getItems={getContracts}
      createItem={createContract}
      updateItem={updateContract}
      deleteItem={deleteContract}
      extraActionRenderer={extraActionRenderer}
    />
  );
};

export default Contracts;
