import React from "react";
import { ChecklistItem } from "./ChecklistItem";
import { useContractFlow } from "../../../Global/Context";
import styles from "./TaskChecklist.module.css";

/**
 * Componente Acordeón para un Servicio.
 */
export const ChecklistServiceAccordion = ({ service, isOpen, onToggle }) => {
  const { activeTask, handleSelectTask } = useContractFlow();

  const headerClass = isOpen
    ? styles.accordionHeaderActive
    : styles.accordionHeader;
  const arrowClass = isOpen ? styles.arrowUp : styles.arrowDown;

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
          {service.tasks.map((task) => (
            <ChecklistItem
              key={task.taskId}
              task={task}
              isActive={activeTask?.taskId === task.taskId}
              onClick={() => handleSelectTask(task.taskId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
