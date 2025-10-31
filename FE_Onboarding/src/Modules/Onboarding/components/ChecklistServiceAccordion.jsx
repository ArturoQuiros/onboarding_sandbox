import React from "react";
import { ChecklistItem } from "./ChecklistItem";
import { useContractFlow } from "../../../Global/Context";
import styles from "./TaskChecklist.module.css";

/**
 * Componente Acordeón para un Servicio.
 * Solo maneja la apertura/cierre y la lista de tareas
 */
export const ChecklistServiceAccordion = ({ service, isOpen, onToggle }) => {
  const { activeTask, activeService, setActiveService, setActiveTask } =
    useContractFlow();

  const headerClass = isOpen
    ? styles.accordionHeaderActive
    : styles.accordionHeader;

  const arrowClass = isOpen ? styles.arrowUp : styles.arrowDown;

  const handleTaskClick = (task) => {
    if (activeTask?.taskId !== task.taskId) {
      setActiveTask(task);
    }
    if (activeService?.serviceId !== service.serviceId) {
      setActiveService(service);
    }
    // Navegación a la ruta de la tarea (mantener según tu app)
  };

  return (
    <div className={styles.accordion}>
      <button
        className={headerClass}
        onClick={() => onToggle(service.serviceId)}
      >
        <span>{service.title}</span>
        <span className={arrowClass}>&#9650;</span>
      </button>

      {isOpen && (
        <div className={styles.accordionContent}>
          {service.tasks?.map((task) => (
            <ChecklistItem
              key={task.taskId}
              task={task}
              isActive={activeTask?.taskId === task.taskId}
              onClick={() => handleTaskClick(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
