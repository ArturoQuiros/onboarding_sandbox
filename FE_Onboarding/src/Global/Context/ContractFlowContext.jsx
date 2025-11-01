// src/Global/Context/ContractFlowContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useContractTasksQuery } from "../../Modules/Admin/hooks";

const ContractFlowContext = createContext();

export const ContractFlowProvider = ({ children }) => {
  const {
    serviceId: routeServiceId,
    taskId: routeTaskId,
    contractId,
  } = useParams();

  const location = useLocation();

  // 🔹 Detectar el rol desde la URL o sessionStorage
  const userType = sessionStorage.getItem("userType");
  const role = location.pathname.startsWith("/staff")
    ? "staff"
    : location.pathname.startsWith("/client")
    ? "client"
    : userType === "staff"
    ? "staff"
    : "client";

  // 🔹 Obtener datos del API usando React Query
  const { services, isLoading, error, updateTaskContract, refetch } =
    useContractTasksQuery(contractId);

  const initialService =
    services?.find((s) => s.serviceId === Number(routeServiceId)) ||
    services?.[0];

  const initialTask =
    initialService?.tasks.find((t) => t.taskId === Number(routeTaskId)) ||
    initialService?.tasks.find((t) => t.status === 3) || // Returned - prioridad
    initialService?.tasks.find((t) => t.status === 2) || // Completed
    initialService?.tasks.find((t) => t.status === 1) || // Pending
    initialService?.tasks[0];

  const [activeService, setActiveService] = useState(initialService);
  const [activeTask, setActiveTask] = useState(initialTask);

  useEffect(() => {
    if (!services || services.length === 0) return;

    let service = services.find((s) => s.serviceId === Number(routeServiceId));
    if (!service) service = services[0];

    let task =
      service.tasks.find((t) => t.taskId === Number(routeTaskId)) ||
      service.tasks.find((t) => t.status === 3) ||
      service.tasks.find((t) => t.status === 2) ||
      service.tasks.find((t) => t.status === 1) ||
      service.tasks[0];

    if (activeService?.serviceId !== service.serviceId) {
      setActiveService(service);
    }

    if (activeTask?.taskId !== task?.taskId) {
      setActiveTask(task);
    }
  }, [
    routeServiceId,
    routeTaskId,
    services,
    activeService?.serviceId,
    activeTask?.taskId,
  ]);

  const handleSelectService = (serviceId) => {
    const service = services.find((s) => s.serviceId === serviceId);
    setActiveService(service);

    const nextTask =
      service.tasks.find((t) => t.status === 3) ||
      service.tasks.find((t) => t.status === 2) ||
      service.tasks.find((t) => t.status === 1) ||
      service.tasks[0];
    setActiveTask(nextTask);
  };

  const handleSelectTask = (taskId) => {
    if (!activeService) return;
    const task = activeService.tasks.find((t) => t.taskId === taskId);
    setActiveTask(task);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Cargando datos del contrato...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        Error al cargar los datos: {error.message}
        <br />
        <button onClick={() => refetch()}>Reintentar</button>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        No hay servicios contratados para este contrato.
      </div>
    );
  }

  return (
    <ContractFlowContext.Provider
      value={{
        services,
        activeService,
        activeTask,
        handleSelectService,
        handleSelectTask,
        setActiveService,
        setActiveTask,
        updateTaskContract,
        refetch,
        contractId,
        role, // 🔹 Exponer el rol
      }}
    >
      {children}
    </ContractFlowContext.Provider>
  );
};

export const useContractFlow = () => useContext(ContractFlowContext);
