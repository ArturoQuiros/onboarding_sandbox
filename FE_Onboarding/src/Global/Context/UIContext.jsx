import React, { createContext, useState, useMemo } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entityIcon, setEntityIcon] = useState(null);
  // Nuevo estado corregido
  const [activeEntity, setActiveEntity] = useState(null);

  const value = useMemo(
    () => ({
      isSidebarOpen,
      setIsSidebarOpen,
      isModalOpen,
      setIsModalOpen,
      entityIcon,
      setEntityIcon,
      activeEntity,
      setActiveEntity,
    }),
    [isSidebarOpen, isModalOpen, entityIcon, activeEntity]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
