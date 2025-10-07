import React, { createContext, useState, useContext } from "react";
import { MOCK_CONTRACT_DATA } from "../data/mockTasks";

// 1️⃣ Crear el contexto
const ContractFlowContext = createContext();

export const ContractFlowProvider = ({ children }) => {
  const [services, setServices] = useState(MOCK_CONTRACT_DATA);

  // Definir servicio y tarea iniciales
  const initialService = services[0];
  const initialTask =
    initialService.tasks.find((t) => t.status === "IN_PROGRESS") ||
    initialService.tasks[0];

  const [activeService, setActiveService] = useState(initialService);
  const [activeTask, setActiveTask] = useState(initialTask);

  const handleSelectService = (serviceId) => {
    const service = services.find((s) => s.serviceId === serviceId);
    setActiveService(service);

    // cuando cambiamos de servicio, seleccionar su primera tarea
    const nextTask =
      service.tasks.find((t) => t.status === "IN_PROGRESS") || service.tasks[0];
    setActiveTask(nextTask);
  };

  const handleSelectTask = (taskId) => {
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
      }}
    >
      {children}
    </ContractFlowContext.Provider>
  );
};

export const useContractFlow = () => useContext(ContractFlowContext);
