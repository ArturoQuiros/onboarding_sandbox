import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MOCK_CONTRACT_DATA } from "../data/mockTasks";

// 1️⃣ Crear el contexto
const ContractFlowContext = createContext();

export const ContractFlowProvider = ({ children }) => {
  const { serviceId: routeServiceId, taskId: routeTaskId } = useParams();
  const [services, setServices] = useState(MOCK_CONTRACT_DATA);

  // Servicio y tarea iniciales
  const initialService =
    services.find((s) => s.serviceId === Number(routeServiceId)) || services[0];

  const initialTask =
    initialService.tasks.find((t) => t.taskId === Number(routeTaskId)) ||
    initialService.tasks.find((t) => t.status === "IN_PROGRESS") ||
    initialService.tasks[0];

  const [activeService, setActiveService] = useState(initialService);
  const [activeTask, setActiveTask] = useState(initialTask);

  // 🔹 Sincronizar activeService y activeTask cuando cambian los parámetros de la URL
  useEffect(() => {
    if (routeServiceId) {
      const service = services.find(
        (s) => s.serviceId === Number(routeServiceId)
      );
      if (service) {
        setActiveService(service);

        // Si existe taskId en URL, seleccionamos esa tarea; sino la primera IN_PROGRESS o la primera
        const task =
          service.tasks.find((t) => t.taskId === Number(routeTaskId)) ||
          service.tasks.find((t) => t.status === "IN_PROGRESS") ||
          service.tasks[0];

        setActiveTask(task);
      }
    }
  }, [routeServiceId, routeTaskId, services]);

  // Función para seleccionar un servicio
  const handleSelectService = (serviceId) => {
    const service = services.find((s) => s.serviceId === serviceId);
    setActiveService(service);

    // cuando cambiamos de servicio, seleccionar su primera tarea
    const nextTask =
      service.tasks.find((t) => t.status === "IN_PROGRESS") || service.tasks[0];
    setActiveTask(nextTask);
  };

  // Función para seleccionar una tarea dentro del servicio activo
  const handleSelectTask = (taskId) => {
    if (!activeService) return;
    const task = activeService.tasks.find((t) => t.taskId === taskId);
    setActiveTask(task);
  };

  return (
    <ContractFlowContext.Provider
      value={{
        services,
        activeService,
        activeTask,
        handleSelectService,
        handleSelectTask,
        setActiveService, // 🔹 ahora disponible
        setActiveTask, // 🔹 ahora disponible
      }}
    >
      {children}
    </ContractFlowContext.Provider>
  );
};

export const useContractFlow = () => useContext(ContractFlowContext);
