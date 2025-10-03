// src/Modules/Contracts/TaskFlow/components/TaskChecklist.jsx

import React, { useState } from "react";
// Iconos para abrir/cerrar el acordeón
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TaskChecklistItem } from "./TaskChecklistItem";
import styles from "./TaskChecklist.module.css";

/**
 * Componente principal del panel lateral. Muestra el listado de tareas
 * agrupadas por sección con funcionalidad de acordeón.
 *
 * @param {object[]} tasks - Array principal que contiene las secciones y sus tareas.
 * @param {string} activeTaskId - ID de la tarea actualmente activa en el formulario.
 * @param {function} onTaskSelect - Handler para cambiar la tarea activa (lo pasará ServiceTaskPage).
 * @returns {JSX.Element}
 */
export const TaskChecklist = ({ tasks, activeTaskId, onTaskSelect }) => {
  // Estado para manejar qué sección del acordeón está abierta.
  // Usaremos un Map o un Set para manejar múltiples estados, pero para simplificar,
  // usaremos un objeto simple con IDs de sección.
  const [openSections, setOpenSections] = useState({});

  // Togglea el estado de apertura/cierre de una sección
  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className={styles.empty}>
        No hay tareas definidas para este servicio.
      </div>
    );
  }

  return (
    <div className={styles.checklistContainer}>
      <h3 className={styles.header}>Progreso del Servicio</h3>

      {/* Itera sobre las secciones principales (ej. "Fase 1: Constitución") */}
      {tasks.map((section) => {
        // Si no tiene un ID, usamos el título como fallback para el estado del acordeón
        const sectionId = section.id || section.title;
        const isOpen =
          openSections[sectionId] === undefined
            ? true
            : openSections[sectionId]; // Abierta por defecto

        return (
          <div key={sectionId} className={styles.section}>
            {/* Encabezado de la Sección (Clickable para toggle) */}
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection(sectionId)}
            >
              <span className={styles.sectionTitle}>{section.title}</span>
              <div className={styles.progressSummary}>
                {section.completedTasks || 0} de {section.totalTasks || 0}
              </div>
              <div className={styles.iconToggle}>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>

            {/* Contenido de la Sección (Visible si isOpen es true) */}
            {isOpen && (
              <div className={styles.taskList}>
                {/* Itera sobre las tareas dentro de esta sección */}
                {section.tasks.map((task) => (
                  <TaskChecklistItem
                    key={task.id}
                    task={task}
                    isActive={task.id === activeTaskId}
                    // Aquí se pasa el handler de selección de tarea
                    onClick={onTaskSelect}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
