// src/Modules/Onboarding/components/DynamicFormReadOnly.jsx

import React from "react";
import styles from "./DynamicFormReadOnly.module.css";
// Usarás los mismos estilos de grid que el DynamicForm original

export const DynamicFormReadOnly = ({ formData }) => {
  if (!formData || (!formData.sections && !formData.fields)) {
    return (
      <div className={styles.emptyForm}>
        No hay datos de formulario para mostrar.
      </div>
    );
  }

  // 💡 FUNCIÓN HELPER para renderizar un valor
  const renderValue = (value, type) => {
    if (!value) return "— N/A —";

    switch (type) {
      case "checkbox":
        return value ? "Sí" : "No";
      case "file":
        // Asumiendo que el valor del archivo es una URL o el nombre del archivo
        return (
          <a
            href={value.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fileLink}
          >
            {value.name || "Ver Archivo Adjunto"}
          </a>
        );
      default:
        return String(value);
    }
  };

  // ⚠️ ATENCIÓN: Esta implementación asume que tu `formData` de entrada
  // YA CONTIENE LOS VALORES LLENADOS por el cliente.

  return (
    <div className={styles.formContainer}>
      {formData.title && <h2 className={styles.formTitle}>{formData.title}</h2>}

      {/* 1. Secciones Repetibles (Asumimos que sectionEntries está serializado en formData.sections) */}
      {formData.sections?.map((section, sIndex) => (
        <div key={sIndex} className={styles.sectionContainer}>
          <h3>{section.title}</h3>

          {/* Iteramos sobre los arrays de valores llenados (asumidos en section.entries) */}
          {section.entries?.map((entryValues, entryIndex) => (
            <div key={entryIndex} className={styles.entryBlock}>
              <h4>{`${section.title} ${entryIndex + 1}`}</h4>

              <div className={styles.formFieldsGrid}>
                {section.fields.map((field) => (
                  <div className={styles.formGroup} key={field.name}>
                    <label className={styles.formLabel}>{field.label}</label>
                    <p className={styles.readOnlyValue}>
                      {/* Buscamos el valor en el objeto de valores para esta entrada */}
                      {renderValue(entryValues[field.name], field.type)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* 2. Formularios simples */}
      {formData.fields && (
        <div className={styles.formFieldsGrid}>
          {formData.fields.map((field) => (
            <div className={styles.formGroup} key={field.name}>
              <label className={styles.formLabel}>{field.label}</label>
              <p className={styles.readOnlyValue}>
                {renderValue(field.value, field.type)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
