// src/Modules/Contracts/TaskFlow/components/TaskChecklistItem.jsx

import React from "react";
import { TaskStatusIcon } from "./TaskStatusIcon";
import styles from "./TaskChecklistItem.module.css";

/**
 * Componente que representa una única tarea o sub-tarea dentro del Checklist lateral.
 *
 * @param {object} task - El objeto de la tarea (debe contener id, title, status).
 * @param {boolean} isActive - Indica si esta es la tarea que se está editando actualmente.
 * @param {function} onClick - Función de callback para seleccionar esta tarea.
 * @returns {JSX.Element}
 */
export const TaskChecklistItem = ({ task, isActive, onClick }) => {
  // Si la tarea está completada o pendiente, permitimos el clic para la navegación.
  // Aunque a menudo solo permites clic si está completo o activo,
  // lo haremos simple: la navegación solo ocurre si la tarea NO está completada.
  const isClickable = task.status !== "complete";

  const handleClick = () => {
    if (isClickable) {
      onClick(task.id);
    }
  };

  return (
    <div
      className={`${styles.item} ${isActive ? styles.active : ""} ${
        !isClickable ? styles.completed : ""
      }`}
      onClick={handleClick}
      // Cambiamos el cursor solo si es clickeable
      style={{ cursor: isClickable ? "pointer" : "default" }}
    >
      <div className={styles.iconWrapper}>
        {/* 1. Usamos el componente de estado que creamos en el paso anterior */}
        <TaskStatusIcon status={task.status} />
      </div>

      {/* 2. Título de la tarea */}
      <span className={styles.title}>{task.title}</span>
    </div>
  );
};
