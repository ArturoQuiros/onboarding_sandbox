import React, { useState, useEffect } from "react";
import styles from "./DynamicForm.module.css";
// Si usas íconos (por ejemplo, Font Awesome o un SVG), lo importarías aquí.

// 💡 Helper para manejar opciones que pueden ser strings o objetos {value, label, details}
const getOptionDetails = (opt) => {
  if (typeof opt === "string") {
    return { value: opt, label: opt };
  }
  // Asume que opt es un objeto como { value, label, details, ... }
  return { value: opt.value, label: opt.label, details: opt.details };
};

// 🆕 NUEVO COMPONENTE: Botón Flotante de Contacto
const FloatingContactButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className={styles.floatingButton}
      onClick={onClick}
      title="Contactar al Account Manager"
    >
      {/* Puedes reemplazar esto con un ícono de chat o teléfono si tienes librerías de íconos */}
      💬
    </button>
  );
};

export const DynamicForm = ({ formData, onSubmit }) => {
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
            if (!el) return; // previene errores si no existe el input
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

  // 🆕 FUNCIÓN DE MANEJO DE CONTACTO
  const handleContactClick = () => {
    // Aquí puedes implementar la lógica para:
    // 1. Abrir un modal de chat.
    // 2. Redirigir a WhatsApp (ej: window.open('https://wa.me/TUNUMERO', '_blank')).
    // 3. Mostrar una alerta simple por ahora:
    alert("Iniciando contacto con el Account Manager...");
    // console.log("Botón flotante de contacto presionado.");
  };

  return (
    // 💡 IMPORTANTE: Si DynamicForm no es el componente más externo de la página,
    // este botón flotante podría estar limitado por el contenedor padre del formulario.
    // Para que flote sobre toda la página, es mejor colocarlo en un componente de nivel superior (Layout o App).
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* ... (Contenido del formulario) ... */}

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

                      {/* ... (Resto del renderizado de campos de sección) ... */}

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

                {/* ✅ CORRECCIÓN 1: Renderizado de la descripción del campo */}
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
                  />
                ) : field.type === "radio" ? (
                  <div className={styles.radioGroup}>
                    {field.options?.map((opt, i) => {
                      // ✅ CORRECCIÓN 2: Soporte para opciones en formato objeto
                      const { value, label, details } = getOptionDetails(opt);
                      return (
                        <label key={i}>
                          <input
                            type="radio"
                            className={styles.formRadio}
                            name={field.name}
                            value={value}
                            defaultChecked={field.value === value}
                            required={field.required}
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
                    defaultValue={field.value}
                  >
                    {field.options?.map((opt, i) => {
                      // ✅ CORRECCIÓN 2: Soporte para opciones en formato objeto
                      const { value, label } = getOptionDetails(opt);
                      return (
                        <option key={i} value={value}>
                          {label}
                        </option>
                      );
                    })}
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

      {/* 🆕 INCLUSIÓN DEL BOTÓN FLOTANTE */}
      <FloatingContactButton onClick={handleContactClick} />
    </>
  );
};
