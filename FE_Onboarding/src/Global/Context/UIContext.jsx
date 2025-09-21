// src/context/UIContext.jsx
import React, { createContext, useState } from "react";

// Crea el contexto para la interfaz de usuario.
export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Puedes añadir más estados de UI aquí.

  const value = {
    isSidebarOpen,
    setIsSidebarOpen,
    isModalOpen,
    setIsModalOpen,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
