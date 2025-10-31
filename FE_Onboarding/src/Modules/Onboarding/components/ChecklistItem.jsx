import React from "react";
import styles from "./TaskChecklist.module.css";
import {
  FaCheck,
  FaCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

/**
 * Componente de Tarea individual.
 */
export const ChecklistItem = ({ task, onClick, isActive }) => {
  // Función para obtener el ícono de estado según el status del API
  const getStatusIcon = (status) => {
    switch (status) {
      case 4: // ACCEPTED - Tarea aprobada por el staff
        return (
          <span className={styles.statusCompleted}>
            <FaCheck size={12} />
          </span>
        );

      case 2: // COMPLETED - Enviada, en revisión por el staff
        return (
          <span className={styles.statusInReview}>
            <FaClock size={12} />
          </span>
        );

      case 3: // RETURNED - Devuelta al cliente, requiere correcciones
        return (
          <span className={styles.statusReturned}>
            <FaExclamationTriangle size={12} />
          </span>
        );

      case 1: // PENDING - No iniciada
      default:
        return (
          <span className={styles.statusPending}>
            <FaCircle size={8} />
          </span>
        );
    }
  };

  // Clase del item según si está activo o no
  const itemClass = isActive
    ? styles.checklistItemActive
    : styles.checklistItem;

  return (
    <div className={itemClass} onClick={onClick}>
      <span className={styles.connectorLine}></span>
      <div className={styles.statusIconWrapper}>
        {getStatusIcon(task.status)}
      </div>
      <span className={styles.taskLabel}>{task.label}</span>
    </div>
  );
};
