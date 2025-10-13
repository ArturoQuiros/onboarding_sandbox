import React from "react";
import styles from "./TaskChecklist.module.css";
// 💡 Importa el ícono de check de la librería que estés usando (ejemplo con Font Awesome)
import { FaCheck, FaCircle } from "react-icons/fa6";
// Si quieres que el círculo rojo tenga un punto dentro, podrías importar MdCircle, etc.

/**
 * Componente de Tarea individual.
 */
export const ChecklistItem = ({ task, onClick, isActive }) => {
  // Función para obtener el ícono de estado según el status
  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
        // 💡 Usamos el componente <FaCheck /> para el checkmark
        return (
          <span className={styles.statusCompleted}>
            <FaCheck size={12} /> {/* Ajusta el 'size' si es necesario */}
          </span>
        );
      case "IN_PROGRESS":
        // 💡 Usamos un <span> vacío. El CSS crea el anillo de color.
        return (
          <span className={styles.statusActive}>
            <FaCircle size={8} />
          </span>
        );
      case "PENDING":
      default:
        // 💡 Usamos un <span> vacío. El CSS crea el anillo de color.
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
