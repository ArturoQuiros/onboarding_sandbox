import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContractTasksQuery } from "../../Modules/Admin/hooks";

// 1️⃣ Crear el contexto
const ContractFlowContext = createContext();

export const ContractFlowProvider = ({ children }) => {
  const {
    serviceId: routeServiceId,
    taskId: routeTaskId,
    contractId,
  } = useParams();

  // 🔹 Obtener datos del API usando React Query
  const { services, isLoading, error, updateTaskContract, refetch } =
    useContractTasksQuery(contractId);

  // Servicio y tarea iniciales
  const initialService =
    services?.find((s) => s.serviceId === Number(routeServiceId)) ||
    services?.[0];

  const initialTask =
    initialService?.tasks.find((t) => t.taskId === Number(routeTaskId)) ||
    initialService?.tasks.find((t) => t.status === 2) || // 2 = Completed (en revisión)
    initialService?.tasks.find((t) => t.status === 3) || // 3 = Returned (requiere acción)
    initialService?.tasks.find((t) => t.status === 1) || // 1 = Pending
    initialService?.tasks[0];

  const [activeService, setActiveService] = useState(initialService);
  const [activeTask, setActiveTask] = useState(initialTask);

  // 🔹 Sincronizar activeService y activeTask cuando cambian los datos o la URL
  useEffect(() => {
    if (!services || services.length === 0) return;

    if (routeServiceId) {
      const service = services.find(
        (s) => s.serviceId === Number(routeServiceId)
      );
      if (service) {
        setActiveService(service);

        // Si existe taskId en URL, seleccionamos esa tarea
        const task =
          service.tasks.find((t) => t.taskId === Number(routeTaskId)) ||
          service.tasks.find((t) => t.status === 2) ||
          service.tasks.find((t) => t.status === 3) ||
          service.tasks.find((t) => t.status === 1) ||
          service.tasks[0];

        setActiveTask(task);
      }
    } else if (!activeService && services.length > 0) {
      // Si no hay servicio en URL, seleccionar el primero
      setActiveService(services[0]);
      const firstTask = services[0].tasks[0];
      setActiveTask(firstTask);
    }
  }, [routeServiceId, routeTaskId, services]);

  // Función para seleccionar un servicio
  const handleSelectService = (serviceId) => {
    const service = services.find((s) => s.serviceId === serviceId);
    setActiveService(service);

    // cuando cambiamos de servicio, seleccionar su primera tarea
    const nextTask =
      service.tasks.find((t) => t.status === 2) ||
      service.tasks.find((t) => t.status === 3) ||
      service.tasks.find((t) => t.status === 1) ||
      service.tasks[0];
    setActiveTask(nextTask);
  };

  // Función para seleccionar una tarea dentro del servicio activo
  const handleSelectTask = (taskId) => {
    if (!activeService) return;
    const task = activeService.tasks.find((t) => t.taskId === taskId);
    setActiveTask(task);
  };

  // 🔹 Mostrar loading mientras carga
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Cargando datos del contrato...
      </div>
    );
  }

  // 🔹 Mostrar error si falla
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        Error al cargar los datos: {error.message}
        <br />
        <button onClick={() => refetch()}>Reintentar</button>
      </div>
    );
  }

  // 🔹 Si no hay servicios
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
        updateTaskContract, // 🔹 Exponer mutación para guardar
        refetch, // 🔹 Exponer refetch para recargar datos
        contractId, // 🔹 Exponer contractId
      }}
    >
      {children}
    </ContractFlowContext.Provider>
  );
};

export const useContractFlow = () => useContext(ContractFlowContext);
