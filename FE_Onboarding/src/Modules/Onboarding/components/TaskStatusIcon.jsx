// src/Modules/Contracts/TaskFlow/components/TaskStatusIcon.jsx

import React from "react";
// Importamos iconos para los estados (ejemplo: FaCheckCircle para completado)
import { FaCheckCircle, FaRegCircle, FaCircle } from "react-icons/fa";
import styles from "./TaskStatusIcon.module.css";

/**
 * Componente que renderiza el ícono de estado de una tarea.
 * * @param {('complete' | 'active' | 'pending')} status - El estado actual de la tarea.
 * @returns {JSX.Element}
 */
export const TaskStatusIcon = ({ status }) => {
  let IconComponent;

  // Mapeo del estado a un componente de ícono y una clase CSS
  switch (status) {
    case "complete":
      // Icono de checkmark para tareas completadas
      IconComponent = FaCheckCircle;
      break;
    case "active":
      // Icono de círculo relleno para la tarea que se está viendo/editando
      IconComponent = FaCircle;
      break;
    case "pending":
    default:
      // Icono de círculo vacío para tareas pendientes (no activas)
      IconComponent = FaRegCircle;
      break;
  }

  return (
    <div className={`${styles.iconContainer} ${styles[status]}`}>
      <IconComponent className={styles.icon} />
    </div>
  );
};
