import React, { useState, useEffect, useContext, useCallback } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsNewspaper, BsTools } from "react-icons/bs";
import axiosClient from "../../../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import styles from "../components/CrudDataTable.module.css";

const Contracts = () => {
  const { setEntityIcon } = useContext(UIContext);
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Set icon al montar
  useEffect(() => {
    setEntityIcon(<BsNewspaper />);
  }, [setEntityIcon]);

  // --- Carga inicial de clientes, usuarios y contratos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, usuariosRes, contratosRes] = await Promise.all([
          axiosClient.get("/cliente"),
          axiosClient.get("/usuario"),
          axiosClient.get("/Contrato"),
        ]);

        setClientes(clientesRes.data);
        setUsuarios(usuariosRes.data);

        const mappedContracts = contratosRes.data.map((c) => ({
          id: c.id,
          client:
            clientesRes.data.find((cl) => cl.id === c.id_Cliente)?.nombre ||
            c.id_Cliente,
          accountManager:
            usuariosRes.data.find((u) => u.id === c.account_manager)?.nombre ||
            c.account_manager,
          status: c.estado,
          id_Cliente: c.id_Cliente,
          account_manager: c.account_manager,
        }));

        setContracts(mappedContracts);
      } catch (error) {
        console.error("Error cargando datos iniciales", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- CRUD Functions dinámicas ---
  const createContract = useCallback(
    async (contract) => {
      const payload = {
        id_Cliente: contract.id_Cliente,
        estado: contract.status,
        account_manager: contract.account_manager,
      };
      const res = await axiosClient.post("/Contrato", payload);

      const newContract = {
        id: res.data.id,
        client:
          clientes.find((cl) => cl.id === res.data.id_Cliente)?.nombre ||
          res.data.id_Cliente,
        accountManager:
          usuarios.find((u) => u.id === res.data.account_manager)?.nombre ||
          res.data.account_manager,
        status: res.data.estado,
        id_Cliente: res.data.id_Cliente,
        account_manager: res.data.account_manager,
      };

      // Agregar al estado local inmediatamente
      setContracts((prev) => [newContract, ...prev]);
      return newContract;
    },
    [clientes, usuarios]
  );

  const updateContract = useCallback(
    async (contract) => {
      const payload = {
        id_Cliente: contract.id_Cliente,
        estado: contract.status,
        account_manager: contract.account_manager,
      };
      const res = await axiosClient.put(`/Contrato/${contract.id}`, payload);

      const updatedContract = {
        id: res.data.id,
        client:
          clientes.find((cl) => cl.id === res.data.id_Cliente)?.nombre ||
          res.data.id_Cliente,
        accountManager:
          usuarios.find((u) => u.id === res.data.account_manager)?.nombre ||
          res.data.account_manager,
        status: res.data.estado,
        id_Cliente: res.data.id_Cliente,
        account_manager: res.data.account_manager,
      };

      // Actualizar en estado local
      setContracts((prev) =>
        prev.map((c) => (c.id === updatedContract.id ? updatedContract : c))
      );

      return updatedContract;
    },
    [clientes, usuarios]
  );

  const deleteContract = useCallback(async (id) => {
    await axiosClient.delete(`/Contrato/${id}`);
    // Eliminar del estado local
    setContracts((prev) => prev.filter((c) => c.id !== id));
    return true;
  }, []);

  const getContracts = useCallback(async () => {
    return contracts;
  }, [contracts]);

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
      isReadOnly: (item) => !!item, // Bloquea el select solo al editar
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
