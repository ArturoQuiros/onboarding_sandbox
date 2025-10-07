import React from "react";
import { useContractFlow } from "../../../Global/Context";
import { ChecklistServiceAccordion } from "./ChecklistServiceAccordion";
import styles from "./TaskChecklist.module.css";

/**
 * Sidebar de lista de tareas por servicio
 */
export const TaskChecklist = () => {
  const { services, activeService, handleSelectService } = useContractFlow();

  return (
    <div className={styles.checklistContainer}>
      {services.map((service) => (
        <ChecklistServiceAccordion
          key={service.serviceId}
          service={service}
          isOpen={activeService?.serviceId === service.serviceId}
          onToggle={handleSelectService} // esto solo abre/cierra el acordeón
        />
      ))}
    </div>
  );
};
