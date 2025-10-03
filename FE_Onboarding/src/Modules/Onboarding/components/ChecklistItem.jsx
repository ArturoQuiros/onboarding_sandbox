// src/modules/contractFlow/components/contractFlow/ChecklistItem.jsx

import React from "react";
import styles from "./TaskChecklist.module.css";

/**
 * Componente individual de la lista de tareas (Stepper).
 * @param {object} task - Datos de la tarea (label, status, active).
 * @param {function} onClick - Manejador de clic.
 */
// 🎯 CAMBIO CLAVE: Usamos 'export const' en lugar de definirlo y usar 'export default' después.
export const ChecklistItem = ({ task, onClick }) => {
  // 1. Lógica para el Ícono de Estado (el círculo verde, rojo, o gris)
  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
        return <span className={styles.statusCompleted}>&#10003;</span>; // Checkmark
      case "ACTIVE":
        return <span className={styles.statusActive}>&#9679;</span>; // Punto rojo (activo)
      case "PENDING":
      default:
        return <span className={styles.statusPending}>&#9675;</span>; // Círculo vacío (gris)
    }
  };

  // 2. Lógica para el estilo activo/inactivo
  const itemClass = task.active
    ? styles.checklistItemActive
    : styles.checklistItem;

  return (
    <div className={itemClass} onClick={() => onClick(task.taskId)}>
      <div className={styles.statusIconWrapper}>
        {getStatusIcon(task.status)}
        {/* La línea conectora vertical (CSS lo maneja) */}
        <span className={styles.connectorLine}></span>
      </div>
      <span className={styles.taskLabel}>{task.label}</span>
    </div>
  );
};
// 🎯 El 'export default ChecklistItem;' anterior ha sido eliminado.
