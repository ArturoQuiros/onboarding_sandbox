// src/Modules/Admin/pages/Contracts.jsx
import React, { useState, useEffect, useContext, useCallback } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsNewspaper } from "react-icons/bs";
import axiosClient from "../../../Api/axiosClient";

/**
 * Página de contratos.
 * Permite crear, editar y eliminar contratos.
 */
const Contracts = () => {
  const { setEntityIcon } = useContext(UIContext);
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Configura el icono de la página
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
        ...c,
        clienteNombre:
          clientes.find((cl) => cl.id === c.id_Cliente)?.nombre || c.id_Cliente,
        accountManagerNombre:
          usuarios.find((u) => u.id === c.account_manager)?.nombre ||
          c.account_manager,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [clientes, usuarios]);

  const createContract = useCallback(async (contract) => {
    try {
      // Mapeo correcto para la API
      const payload = {
        id_Cliente: contract.id_Cliente, // viene del select
        estado: contract.estado,
        account_manager: contract.account_manager, // viene del select
      };
      const res = await axiosClient.post("/Contrato", payload);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const updateContract = useCallback(async (contract) => {
    try {
      const payload = {
        id_Cliente: contract.id_Cliente,
        estado: contract.estado,
        account_manager: contract.account_manager,
      };
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

  if (isLoading) return <div>Cargando configuración de contratos...</div>;

  // --- Campos para CrudForm / DataTable ---
  const contractFields = [
    { key: "id", labelKey: "contracts.table.id", type: "text" },
    {
      key: "clienteNombre", // para mostrar en tabla
      formKey: "id_Cliente", // para editar/crear
      labelKey: "contracts.table.client",
      type: "select",
      options: clientes.map((c) => ({ value: c.id, label: c.nombre })),
      validation: { required: true },
    },
    {
      key: "estado",
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
      key: "accountManagerNombre", // para mostrar en tabla
      formKey: "account_manager", // para editar/crear
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
