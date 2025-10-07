import React, { createContext, useState, useContext } from "react";
import { MOCK_CONTRACT_DATA } from "../data/mockTasks";

// 1️⃣ Crear el contexto
const ContractFlowContext = createContext();

// 2️⃣ Proveedor del contexto
export const ContractFlowProvider = ({ children }) => {
  const [services, setServices] = useState(MOCK_CONTRACT_DATA);
  const [activeService, setActiveService] = useState(services[0] || null);
  const [activeTask, setActiveTask] = useState(
    activeService?.tasks.find((t) => t.active) || null
  );

  // 🧭 Función para seleccionar servicio (acordeón)
  const handleSelectService = (serviceId) => {
    const service = services.find((s) => s.serviceId === serviceId);
    setActiveService(service);
  };

  // 🧭 Función para seleccionar tarea (formularios)
  const handleSelectTask = (taskId) => {
    const task = activeService?.tasks.find((t) => t.taskId === taskId);
    setActiveTask(task);
  };

  return (
    <ContractFlowContext.Provider
      value={{
        services,
        activeService,
        activeTask,
        setServices,
        handleSelectService,
        handleSelectTask,
      }}
    >
      {children}
    </ContractFlowContext.Provider>
  );
};

// 3️⃣ Hook para consumir el contexto
export const useContractFlow = () => {
  const context = useContext(ContractFlowContext);
  if (!context) {
    throw new Error(
      "useContractFlow debe usarse dentro de un ContractFlowProvider"
    );
  }
  return context;
};
