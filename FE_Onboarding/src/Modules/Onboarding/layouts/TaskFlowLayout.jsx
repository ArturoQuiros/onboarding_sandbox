// src/Modules/Contracts/TaskFlow/components/TaskFlowLayout.jsx

import React from "react";
import { TaskChecklist, DynamicFormRenderer } from "../components";
import styles from "./TaskFlowLayout.module.css";

/**
 * Componente Layout principal que establece la estructura de dos paneles
 * (Formulario y Checklist) para el flujo de tareas en curso.
 * * @param {object[]} tasks - Estructura completa de las tareas.
 * @param {string} activeTaskId - ID de la tarea actualmente activa.
 * @param {string} activeComponentKey - Clave del formulario a renderizar.
 * @param {object} initialData - Datos precargados para el formulario.
 * @param {function} onNext - Manejador para guardar y avanzar (handleNext).
 * @param {function} onBack - Manejador para retroceder.
 * @param {boolean} canGoBack - Indica si se permite retroceder.
 * @param {boolean} isSaving - Indica si se está guardando.
 * @returns {JSX.Element}
 */
export const TaskFlowLayout = ({
  tasks,
  activeTaskId,
  activeComponentKey,
  initialData,
  onNext,
  onBack,
  canGoBack,
  isSaving, // Prop para el estado de guardado
}) => {
  return (
    // El contenedor aplica el estilo de 2 columnas (70/30)
    <div className={styles.container}>
      {/* Panel de Formulario - Lado Izquierdo (~70%) */}
      <main className={styles.formPanel}>
        <DynamicFormRenderer
          componentKey={activeComponentKey}
          initialData={initialData}
          // Pasamos las funciones de navegación al motor
          onNext={onNext}
          onBack={onBack}
          canGoBack={canGoBack}
          isSaving={isSaving} // Estado de guardado
        />
      </main>

      {/* Panel de Checklist - Lado Derecho (~30%) */}
      <aside className={styles.checklistPanel}>
        <TaskChecklist
          tasks={tasks}
          activeTaskId={activeTaskId}
          // No pasamos onTaskSelect aquí si solo queremos navegar con Back/Next
        />
      </aside>
    </div>
  );
};
