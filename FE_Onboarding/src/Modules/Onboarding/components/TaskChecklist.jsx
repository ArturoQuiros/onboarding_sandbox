import React, { useState, useEffect } from "react";
import { ChecklistServiceAccordion } from "./ChecklistServiceAccordion";
import { useContractFlow } from "../../../Global/Context";
import styles from "./TaskChecklist.module.css";

/**
 * Sidebar de lista de tareas por servicio
 */
export const TaskChecklist = () => {
  const { services, activeService, handleSelectService } = useContractFlow();

  // Estado local para manejar qué acordeón está abierto
  const [openServiceId, setOpenServiceId] = useState(
    activeService?.serviceId || null
  );

  // Si cambia activeService desde el contexto, sincronizamos el acordeón abierto
  useEffect(() => {
    if (activeService) {
      setOpenServiceId(activeService.serviceId);
    }
  }, [activeService]);

  // Función para abrir/cerrar acordeón
  const handleToggle = (serviceId) => {
    setOpenServiceId((prevId) => (prevId === serviceId ? null : serviceId));
    // Actualizamos el servicio activo en el contexto si se abre
    if (openServiceId !== serviceId) {
      handleSelectService(serviceId);
    }
  };

  return (
    <div className={styles.checklistContainer}>
      {services.map((service) => (
        <ChecklistServiceAccordion
          key={service.serviceId}
          service={service}
          isOpen={openServiceId === service.serviceId}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
