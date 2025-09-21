// src/Modules/Admin/components/Crud/CrudForm.jsx

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./CrudForm.module.css";

export const CrudForm = ({ fields, item, onSave, onCancel }) => {
  const { t } = useTranslation("global");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      const initialData = {};
      fields.forEach((field) => {
        // Excluye el campo 'id' de la inicialización si es un nuevo ítem
        if (field.key !== "id") {
          initialData[field.key] = "";
        }
      });
      setFormData(initialData);
    }
  }, [item, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.formTitle}>
        {item ? t("common.edit") : t("common.create")}
      </h3>
      {fields.map((field) => {
        // Si no es un nuevo ítem y el campo es el ID, lo hacemos de solo lectura.
        // Si es un nuevo ítem, lo ocultamos completamente.
        if (!item && field.key === "id") {
          return null; // No renderiza el campo ID
        }

        const isIdField = field.key === "id";

        return (
          <div key={field.key} className={styles.formGroup}>
            <label className={styles.label}>{t(field.labelKey)}</label>
            <input
              type={field.type || "text"}
              name={field.key}
              value={formData[field.key] || ""}
              onChange={isIdField ? null : handleChange} // El ID no debe poder editarse
              readOnly={isIdField} // El campo de ID es de solo lectura
              className={styles.input}
            />
          </div>
        );
      })}
      <button type="submit" className={styles.saveButton}>
        {t("common.save")}
      </button>
      <button type="button" onClick={onCancel} className={styles.cancelButton}>
        {t("common.cancel")}
      </button>
    </form>
  );
};
