import React from "react";
import styles from "./TaskChecklist.module.css";

/**
 * Componente de Tarea individual.
 * @param {object} task - La tarea con { taskId, label, status }.
 * @param {function} onClick - Manejador al hacer clic en la tarea.
 * @param {boolean} isActive - Indica si es la tarea actualmente activa.
 */
export const ChecklistItem = ({ task, onClick, isActive }) => {
  // Función para obtener el ícono de estado según el status
  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
        return <span className={styles.statusCompleted}>&#10003;</span>; // ✅ Verde
      case "IN_PROGRESS":
        return <span className={styles.statusActive}>&#9679;</span>; // 🔶 Naranja
      case "PENDING":
      default:
        return <span className={styles.statusPending}>&#9675;</span>; // 🔴 Rojo
    }
  };

  // Clase del item según si está activo o no
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
