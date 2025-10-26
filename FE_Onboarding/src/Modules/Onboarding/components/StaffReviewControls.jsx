// src/Modules/Onboarding/components/StaffReview/StaffReviewControls.jsx

import React from "react";
import styles from "./StaffReviewControls.module.css";

// Opciones de estado que el Staff puede aplicar
const STATUS_OPTIONS = [
  "Pendiente de revisión",
  "Aceptada",
  "Devuelta",
  "Completada",
];

export const StaffReviewControls = ({
  status,
  observation,
  onStatusChange,
  onObservationChange,
  onSave,
}) => {
  const handlePrint = () => {
    window.print(); // Función nativa para imprimir la página
  };

  return (
    <div className={styles.controlsBar}>
      {/* 1. Selector de Estado */}
      <div className={styles.controlGroup}>
        <label>Cambiar Estado:</label>
        <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Campo de Observaciones */}
      <div className={styles.controlGroup}>
        <label>Observaciones (para el cliente):</label>
        <textarea
          value={observation}
          onChange={(e) => onObservationChange(e.target.value)}
          placeholder="Escriba aquí los comentarios o razones para devolver la tarea..."
          rows={1}
        />
      </div>

      <div className={styles.actions}>
        {/* 3. Botón de Guardar/Aplicar Cambios */}
        <button className={styles.saveButton} onClick={onSave}>
          Guardar Revisión
        </button>

        {/* 4. Botón de Impresión */}
        <button className={styles.printButton} onClick={handlePrint}>
          🖨️ Imprimir
        </button>
      </div>
    </div>
  );
};
