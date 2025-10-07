import React from "react";
import styles from "./TaskChecklist.module.css";

/**
 * Componente individual de la lista de tareas (Stepper).
 */
export const ChecklistItem = ({ task, isActive, onClick }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
        return <span className={styles.statusCompleted}>&#10003;</span>;
      case "IN_PROGRESS":
        return <span className={styles.statusActive}>&#9679;</span>;
      case "PENDING":
      default:
        return <span className={styles.statusPending}>&#9675;</span>;
    }
  };

  const itemClass = isActive
    ? styles.checklistItemActive
    : styles.checklistItem;

  return (
    <div className={itemClass} onClick={onClick}>
      <div className={styles.statusIconWrapper}>
        {getStatusIcon(task.status)}
        <span className={styles.connectorLine}></span>
      </div>
      <span className={styles.taskLabel}>{task.label}</span>
    </div>
  );
};
