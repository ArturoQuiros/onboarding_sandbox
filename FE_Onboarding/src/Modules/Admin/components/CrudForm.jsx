// src/Modules/Admin/components/Crud/CrudForm.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./CrudForm.module.css";

export const CrudForm = ({ fields, item, onSave, onCancel }) => {
  const { t } = useTranslation("global");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Si se pasa un 'item', llenamos el formulario con sus datos
    if (item) {
      setFormData(item);
    } else {
      // Si es un nuevo ítem, inicializamos el formulario con campos vacíos
      const initialData = {};
      fields.forEach((field) => {
        initialData[field.key] = "";
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
      {fields.map((field) => (
        <div key={field.key} className={styles.formGroup}>
          <label className={styles.label}>{t(field.labelKey)}</label>
          <input
            type={field.type || "text"}
            name={field.key}
            value={formData[field.key] || ""}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      ))}
      <button type="submit" className={styles.saveButton}>
        {t("common.save")}
      </button>
      <button type="button" onClick={onCancel} className={styles.cancelButton}>
        {t("common.cancel")}
      </button>
    </form>
  );
};
