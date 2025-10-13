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

  // Sincronizamos el acordeón abierto si cambia activeService desde el contexto
  useEffect(() => {
    if (activeService) {
      setOpenServiceId(activeService.serviceId);
    }
  }, [activeService]);

  // Función para abrir/cerrar acordeón sin actualizar estado durante render
  const handleToggle = (serviceId) => {
    if (openServiceId === serviceId) {
      // Cierra el acordeón
      setOpenServiceId(null);
    } else {
      // Abre el acordeón
      setOpenServiceId(serviceId);
      // Actualizamos el servicio activo en el contexto
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
