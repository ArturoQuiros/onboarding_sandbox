// src/Modules/Admin/components/Crud/CrudForm.jsx
import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UIContext } from "../../../Global/Context";
import styles from "./CrudForm.module.css";

export const CrudForm = ({ fields, item, onSave, onCancel, validations }) => {
  const { t } = useTranslation("global");
  const { entityIcon } = useContext(UIContext);

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  // Inicializa los datos del formulario
  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      const initialData = {};
      fields.forEach((field) => {
        if (field.key !== "id") initialData[field.key] = "";
      });
      setFormData(initialData);
    }
    setFormErrors({});
  }, [item, fields]);

  // Maneja cambios en los inputs y valida dinámicamente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validations && validations[name]) {
      const error = validations[name](value, { ...formData, [name]: value });
      setFormErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Maneja el submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validations) {
      const newErrors = {};
      for (const key in validations) {
        const error = validations[key](formData[key], formData);
        if (error) newErrors[key] = error;
      }
      setFormErrors(newErrors);

      if (Object.keys(newErrors).length > 0) return; // bloquea envío si hay errores
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {/* Encabezado */}
      <div className={styles.formHeader}>
        {entityIcon && <div className={styles.entityIcon}>{entityIcon}</div>}
        <h2 className={styles.formTitle}>
          {item ? t("common.edit") : t("common.create")}
        </h2>
      </div>

      {/* Campos dinámicos */}
      {fields.map((field) => {
        if (!item && field.key === "id") return null;
        const isIdField = field.key === "id";

        return (
          <div key={field.key} className={styles.formGroup}>
            <label className={styles.label}>{t(field.labelKey)}</label>

            {field.type === "select" ? (
              <select
                name={field.key}
                value={formData[field.key] || ""}
                onChange={handleChange}
                className={`${styles.input} ${
                  formErrors[field.key] ? styles.inputError : ""
                }`}
              >
                <option value="">{t("common.selectOption")}</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                name={field.key}
                value={formData[field.key] || ""}
                onChange={isIdField ? null : handleChange}
                readOnly={isIdField}
                className={`${styles.input} ${
                  formErrors[field.key] ? styles.inputError : ""
                }`}
              />
            )}

            {formErrors[field.key] && (
              <div className={styles.errorMessage}>{formErrors[field.key]}</div>
            )}
          </div>
        );
      })}

      {/* Botones */}
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.saveButton}>
          {t("common.save")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
        >
          {t("common.cancel")}
        </button>
      </div>
    </form>
  );
};
