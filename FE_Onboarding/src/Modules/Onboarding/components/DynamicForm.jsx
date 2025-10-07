import React from "react";
import styles from "./DynamicForm.module.css";

export const DynamicForm = ({ formData, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {};
    formData.fields.forEach((f) => {
      const el = e.target.elements[f.name];
      if (f.type === "checkbox") {
        values[f.name] = el.checked;
      } else if (f.type === "file") {
        values[f.name] = el.files[0] || null;
      } else {
        values[f.name] = el.value;
      }
    });
    onSubmit(values);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {formData.title && <h2 className={styles.formTitle}>{formData.title}</h2>}
      {formData.description && (
        <p className={styles.formDescription}>{formData.description}</p>
      )}

      <div className={styles.formFieldsGrid}>
        {formData.fields.map((field) => (
          <div className={styles.formGroup} key={field.name}>
            <label className={styles.formLabel}>{field.label}</label>

            {/* Inputs de texto, number, date */}
            {["text", "number", "date"].includes(field.type) && (
              <input
                type={field.type}
                className={styles.formInput}
                defaultValue={field.value}
                readOnly={field.readOnly}
                name={field.name}
              />
            )}

            {/* Select */}
            {field.type === "select" && (
              <select
                className={styles.formSelect}
                defaultValue={field.value}
                name={field.name}
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {/* Radio */}
            {field.type === "radio" && (
              <div className={styles.radioGroup}>
                {field.options.map((opt) => (
                  <label key={opt}>
                    <input
                      type="radio"
                      className={styles.formRadio}
                      name={field.name}
                      value={opt}
                      defaultChecked={field.value === opt}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}

            {/* Checkbox */}
            {field.type === "checkbox" && (
              <input
                type="checkbox"
                className={styles.formCheckbox}
                defaultChecked={field.value}
                name={field.name}
              />
            )}

            {/* File */}
            {field.type === "file" && (
              <input
                type="file"
                className={styles.formFile}
                name={field.name}
              />
            )}
          </div>
        ))}
      </div>

      <button className={styles.formButton} type="submit">
        Guardar
      </button>
    </form>
  );
};
