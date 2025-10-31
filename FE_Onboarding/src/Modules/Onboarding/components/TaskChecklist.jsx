import React from "react";
import { ChecklistServiceAccordion } from "./ChecklistServiceAccordion";
import { useContractFlow } from "../../../Global/Context";
import styles from "./TaskChecklist.module.css";

export const TaskChecklist = () => {
  const { services, activeService, handleSelectService } = useContractFlow();

  const handleToggle = (serviceId) => {
    if (activeService?.serviceId === serviceId) {
      // Si el acordeón ya está abierto, lo cerramos
      handleSelectService(null);
    } else {
      // Abrimos el acordeón seleccionado
      handleSelectService(serviceId);
    }
  };

  return (
    <div className={styles.checklistContainer}>
      {services.map((service) => (
        <ChecklistServiceAccordion
          key={service.serviceId}
          service={service}
          isOpen={activeService?.serviceId === service.serviceId}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
