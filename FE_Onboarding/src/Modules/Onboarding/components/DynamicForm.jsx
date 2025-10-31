import React, { useState, useEffect } from "react";
import styles from "./DynamicForm.module.css";

// 💡 Helper para manejar opciones que pueden ser strings o objetos {value, label, details}
const getOptionDetails = (opt) => {
  if (typeof opt === "string") {
    return { value: opt, label: opt };
  }
  return { value: opt.value, label: opt.label, details: opt.details };
};

// 🆕 Botón Flotante de Contacto
const FloatingContactButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className={styles.floatingButton}
      onClick={onClick}
      title="Contactar al Account Manager"
    >
      💬
    </button>
  );
};

export const DynamicForm = ({
  formData,
  onSubmit,
  initialData,
  disabled = false,
}) => {
  const [sectionEntries, setSectionEntries] = useState(
    formData.sections ? formData.sections.map(() => [{}]) : [[]]
  );

  // 🔁 Resetea sectionEntries cada vez que cambia formData
  useEffect(() => {
    if (formData.sections) {
      setSectionEntries(formData.sections.map(() => [{}]));
    } else {
      setSectionEntries([[]]);
    }
  }, [formData]);

  const handleAdd = (sectionIndex) => {
    if (disabled) return;
    setSectionEntries((prev) => {
      const updated = [...prev];
      updated[sectionIndex] = [...updated[sectionIndex], {}];
      return updated;
    });
  };

  const handleRemove = (sectionIndex, entryIndex) => {
    if (disabled) return;
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
    if (disabled) return;

    if (formData.sections) {
      const result = formData.sections.map((section, sIndex) => {
        const sectionValues = sectionEntries[sIndex].map((_, entryIndex) => {
          const values = {};
          section.fields.forEach((f) => {
            const fieldName = `${section.title}-${f.name}-${entryIndex}`;
            const el = e.target.elements[fieldName];
            if (!el) return;
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
        if (!el) return;
        if (f.type === "checkbox") values[f.name] = el.checked;
        else if (f.type === "file") values[f.name] = el.files[0] || null;
        else values[f.name] = el.value;
      });
      onSubmit(values);
    }
  };

  const handleContactClick = () => {
    alert("Iniciando contacto con el Account Manager...");
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* Formularios con secciones repetibles */}
        {formData.sections?.map((section, sIndex) => (
          <div key={sIndex} className={styles.sectionContainer}>
            <h3>{section.title}</h3>

            {sectionEntries[sIndex]?.map((_, entryIndex) => (
              <div key={entryIndex} className={styles.entryBlock}>
                <h4>{`${section.title} ${entryIndex + 1}`}</h4>

                <div className={styles.formFieldsGrid}>
                  {section.fields.map((field) => (
                    <div className={styles.formGroup} key={field.name}>
                      <label className={styles.formLabel}>{field.label}</label>

                      {field.description && (
                        <p className={styles.fieldDescription}>
                          {field.description}
                        </p>
                      )}

                      {field.type === "paragraph" ? (
                        <p className={styles.readOnlyText}>{field.value}</p>
                      ) : field.type === "textarea" ? (
                        <textarea
                          name={`${section.title}-${field.name}-${entryIndex}`}
                          className={styles.formTextarea}
                          required={field.required}
                          disabled={disabled}
                          defaultValue={
                            initialData?.[section.title]?.[entryIndex]?.[
                              field.name
                            ] || ""
                          }
                        />
                      ) : field.type === "radio" ? (
                        <div className={styles.radioGroup}>
                          {field.options?.map((opt, i) => {
                            const { value, label, details } =
                              getOptionDetails(opt);
                            return (
                              <label key={i}>
                                <input
                                  type="radio"
                                  className={styles.formRadio}
                                  name={`${section.title}-${field.name}-${entryIndex}`}
                                  value={value}
                                  defaultChecked={
                                    initialData?.[section.title]?.[
                                      entryIndex
                                    ]?.[field.name] === value ||
                                    field.value === value
                                  }
                                  required={field.required}
                                  disabled={disabled}
                                />
                                <span>{label}</span>
                                {details && (
                                  <span className={styles.optionDetails}>
                                    ({details})
                                  </span>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      ) : field.type === "select" ? (
                        <select
                          name={`${section.title}-${field.name}-${entryIndex}`}
                          className={styles.formSelect}
                          required={field.required}
                          disabled={disabled}
                          defaultValue={
                            initialData?.[section.title]?.[entryIndex]?.[
                              field.name
                            ] || field.value
                          }
                        >
                          {field.options?.map((opt, i) => {
                            const { value, label } = getOptionDetails(opt);
                            return (
                              <option key={i} value={value}>
                                {label}
                              </option>
                            );
                          })}
                        </select>
                      ) : field.type === "checkbox" ? (
                        <input
                          type="checkbox"
                          name={`${section.title}-${field.name}-${entryIndex}`}
                          className={styles.formInput}
                          disabled={disabled}
                          defaultChecked={
                            initialData?.[section.title]?.[entryIndex]?.[
                              field.name
                            ] || false
                          }
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={`${section.title}-${field.name}-${entryIndex}`}
                          className={
                            field.type === "file"
                              ? styles.formFile
                              : styles.formInput
                          }
                          required={field.required}
                          disabled={disabled}
                          defaultValue={
                            field.type !== "file"
                              ? initialData?.[section.title]?.[entryIndex]?.[
                                  field.name
                                ] || ""
                              : undefined
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>

                {section.repeatable &&
                  sectionEntries[sIndex].length > 1 &&
                  !disabled && (
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

            {section.repeatable && !disabled && (
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

                {field.description && (
                  <p className={styles.fieldDescription}>{field.description}</p>
                )}

                {field.type === "paragraph" ? (
                  <p className={styles.readOnlyText}>{field.value}</p>
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    className={styles.formTextarea}
                    required={field.required}
                    disabled={disabled}
                    defaultValue={initialData?.[field.name] || ""}
                  />
                ) : field.type === "radio" ? (
                  <div className={styles.radioGroup}>
                    {field.options?.map((opt, i) => {
                      const { value, label, details } = getOptionDetails(opt);
                      return (
                        <label key={i}>
                          <input
                            type="radio"
                            className={styles.formRadio}
                            name={field.name}
                            value={value}
                            defaultChecked={
                              initialData?.[field.name] === value ||
                              field.value === value
                            }
                            required={field.required}
                            disabled={disabled}
                          />
                          <span>{label}</span>
                          {details && (
                            <span className={styles.optionDetails}>
                              ({details})
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    className={styles.formSelect}
                    required={field.required}
                    disabled={disabled}
                    defaultValue={initialData?.[field.name] || field.value}
                  >
                    {field.options?.map((opt, i) => {
                      const { value, label } = getOptionDetails(opt);
                      return (
                        <option key={i} value={value}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                ) : field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    name={field.name}
                    className={styles.formInput}
                    disabled={disabled}
                    defaultChecked={initialData?.[field.name] || false}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    className={
                      field.type === "file" ? styles.formFile : styles.formInput
                    }
                    required={field.required}
                    disabled={disabled}
                    defaultValue={
                      field.type !== "file"
                        ? initialData?.[field.name] || ""
                        : undefined
                    }
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <button
          className={styles.formButton}
          type="submit"
          disabled={disabled}
          style={disabled ? { opacity: 0.5, cursor: "not-allowed" } : {}}
        >
          {disabled ? "Formulario bloqueado" : "Guardar"}
        </button>
      </form>

      <FloatingContactButton onClick={handleContactClick} />
    </>
  );
};
