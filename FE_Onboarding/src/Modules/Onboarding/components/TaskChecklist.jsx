// src/modules/contractFlow/components/contractFlow/TaskChecklist.jsx

import React, { useState } from "react";
// Importamos los datos mock
import { MOCK_CONTRACT_DATA } from "../../../Global/data";
// 🎯 AJUSTE: Importación nombrada
import { ChecklistServiceAccordion } from "./ChecklistServiceAccordion";
import styles from "./TaskChecklist.module.css"; // Usaremos un CSS Module

/**
 * Contenedor principal del sidebar de la lista de tareas.
 */
// 🎯 EXPORTACIÓN AJUSTADA: export const
export const TaskChecklist = () => {
  // Estado para controlar qué servicio está abierto (solo uno a la vez)
  const [openServiceId, setOpenServiceId] = useState(1); // Inicialmente abrimos el primer servicio (ID 1)

  const handleToggle = (serviceId) => {
    setOpenServiceId(openServiceId === serviceId ? null : serviceId);
  };

  return (
    <div className={styles.checklistContainer}>
      {MOCK_CONTRACT_DATA.map((service) => (
        <ChecklistServiceAccordion
          key={service.serviceId}
          service={service}
          isOpen={service.serviceId === openServiceId}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
