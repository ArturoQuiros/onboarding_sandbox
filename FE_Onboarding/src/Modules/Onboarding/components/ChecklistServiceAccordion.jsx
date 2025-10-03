// src/modules/contractFlow/components/contractFlow/ChecklistServiceAccordion.jsx

import React from "react";
// 🎯 CORRECCIÓN: Importación nombrada de ChecklistItem
import { ChecklistItem } from "./ChecklistItem";
import styles from "./TaskChecklist.module.css";

/**
 * Componente Acordeón para un Servicio.
 * @param {object} service - Datos del servicio.
 * @param {boolean} isOpen - Indica si el acordeón está abierto.
 * @param {function} onToggle - Función para abrir/cerrar el acordeón.
 */
// 🎯 CAMBIO CLAVE: Exportación nombrada para compatibilidad con 'export *'
export const ChecklistServiceAccordion = ({ service, isOpen, onToggle }) => {
  // Clase condicional para el header activo (rojo) o inactivo (gris)
  const headerClass = isOpen
    ? styles.accordionHeaderActive
    : styles.accordionHeader;
  const arrowClass = isOpen ? styles.arrowUp : styles.arrowDown;

  // Función de navegación mock (luego conectaremos a useNavigate)
  const handleTaskClick = (taskId) => {
    console.log(`Navegando a la tarea: ${service.serviceId}-${taskId}`);
    // Aquí iría la lógica para cambiar la URL y el formulario principal
  };

  return (
    <div className={styles.accordion}>
      {/* HEADER DEL SERVICIO (El botón grande) */}
      <button
        className={headerClass}
        onClick={() => onToggle(service.serviceId)}
      >
        <span>{service.title}</span>
        {/* Usamos un triángulo CSS o un ícono de flecha para la animación */}
        <span className={arrowClass}>&#9650;</span>
      </button>

      {/* CONTENIDO (La lista de tareas) */}
      {isOpen && (
        <div className={styles.accordionContent}>
          {service.tasks.map((task) => (
            <ChecklistItem
              key={task.taskId}
              task={task}
              onClick={handleTaskClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
// 🎯 Eliminamos el 'export default ChecklistServiceAccordion;'
