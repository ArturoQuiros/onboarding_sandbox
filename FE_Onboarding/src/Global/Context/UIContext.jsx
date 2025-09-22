import React, { createContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ⬇ Nuevo estado para el icono
  const [entityIcon, setEntityIcon] = useState(null);

  const value = {
    isSidebarOpen,
    setIsSidebarOpen,
    isModalOpen,
    setIsModalOpen,
    entityIcon,
    setEntityIcon, // ⬅ Exponemos la función para actualizarlo
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
