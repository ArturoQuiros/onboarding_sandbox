import React, { useState } from "react";
import styles from "./DynamicForm.module.css";

export const DynamicForm = ({ formData, onSubmit }) => {
  const [sectionEntries, setSectionEntries] = useState(
    formData.sections ? formData.sections.map(() => [{}]) : [[]]
  );

  const handleAdd = (sectionIndex) => {
    setSectionEntries((prev) => {
      const updated = [...prev];
      updated[sectionIndex] = [...updated[sectionIndex], {}];
      return updated;
    });
  };

  const handleRemove = (sectionIndex, entryIndex) => {
    setSectionEntries((prev) => {
      const updated = [...prev];
      updated[sectionIndex] = updated[sectionIndex].filter(
        (_, i) => i !== entryIndex
      );
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.sections) {
      const result = formData.sections.map((section, sIndex) => {
        const sectionValues = sectionEntries[sIndex].map((_, entryIndex) => {
          const values = {};
          section.fields.forEach((f) => {
            const fieldName = `${section.title}-${f.name}-${entryIndex}`;
            const el = e.target.elements[fieldName];
            if (f.type === "checkbox") values[f.name] = el.checked;
            else if (f.type === "file") values[f.name] = el.files[0] || null;
            else values[f.name] = el.value;
          });
          return values;
        });
        return { section: section.title, values: sectionValues };
      });

      onSubmit(result);
    } else if (formData.fields) {
      const values = {};
      formData.fields.forEach((f) => {
        const el = e.target.elements[f.name];
        // En un formulario simple, si es radio, el valor viene del grupo.
        // Si tienes varios radios con el mismo 'name', e.target.elements[f.name].value
        // debería devolver el valor seleccionado (esto funciona en formularios no controlados).
        if (f.type === "checkbox") values[f.name] = el.checked;
        else if (f.type === "file") values[f.name] = el.files[0] || null;
        else values[f.name] = el.value;
      });
      onSubmit(values);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {formData.title && <h2 className={styles.formTitle}>{formData.title}</h2>}
      {formData.description && (
        <p className={styles.formDescription}>{formData.description}</p>
      )}

      {/* Formularios con secciones repetibles */}
      {formData.sections?.map((section, sIndex) => (
        <div key={sIndex} className={styles.sectionContainer}>
          <h3>{section.title}</h3>

          {sectionEntries[sIndex].map((_, entryIndex) => (
            <div key={entryIndex} className={styles.entryBlock}>
              <h4>{`${section.title} ${entryIndex + 1}`}</h4>

              <div className={styles.formFieldsGrid}>
                {section.fields.map((field) => (
                  <div className={styles.formGroup} key={field.name}>
                    <label className={styles.formLabel}>{field.label}</label>
                    <input
                      type={field.type}
                      name={`${section.title}-${field.name}-${entryIndex}`}
                      className={styles.formInput}
                      required={field.required}
                    />
                  </div>
                ))}
              </div>

              {section.repeatable && sectionEntries[sIndex].length > 1 && (
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemove(sIndex, entryIndex)}
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}

          {section.repeatable && (
            <button
              type="button"
              className={styles.addButton}
              onClick={() => handleAdd(sIndex)}
            >
              + Agregar {section.title}
            </button>
          )}
        </div>
      ))}

      {/* Formularios simples */}
      {formData.fields && (
        <div className={styles.formFieldsGrid}>
          {formData.fields.map((field) => (
            <div className={styles.formGroup} key={field.name}>
              <label className={styles.formLabel}>{field.label}</label>
              {field.type === "paragraph" ? (
                <p className={styles.readOnlyText}>{field.value}</p>
              ) : field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  className={styles.formTextarea}
                  required={field.required}
                />
              ) : field.type === "radio" ? ( // ✨ Manejo de Radio Buttons
                <div className={styles.radioGroup}>
                  {field.options.map((opt) => (
                    <label key={opt}>
                      <input
                        type="radio"
                        className={styles.formRadio} // Clase específica para radio/checkbox
                        name={field.name} // Importante: mismo nombre para agrupar
                        value={opt}
                        defaultChecked={field.value === opt}
                      />
                      <span>{opt}</span>{" "}
                      {/* Agregamos un span para el estilo :checked + span */}
                    </label>
                  ))}
                </div>
              ) : field.type === "select" ? ( // Manejo de Select
                <select
                  name={field.name}
                  className={styles.formSelect}
                  required={field.required}
                  defaultValue={field.value}
                >
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  className={
                    field.type === "file" ? styles.formFile : styles.formInput
                  }
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <button className={styles.formButton} type="submit">
        Guardar
      </button>
    </form>
  );
};
