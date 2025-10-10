import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UIContext } from "../../../Global/Context";
import styles from "./CrudForm.module.css";

export const CrudForm = ({ fields, item, onSave, onCancel, validations }) => {
  const { t } = useTranslation("global");
  const { entityIcon } = useContext(UIContext);

  // Prioriza formKey si está definida, si no, usa key
  const getFormKey = (field) => field.formKey || field.key;

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      const initialData = {};
      fields.forEach((field) => {
        const key = getFormKey(field);
        if (key !== "id") initialData[key] = "";
      });
      setFormData(initialData);
    }
    setFormErrors({});
  }, [item, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validations && validations[name]) {
      const error = validations[name](value, { ...formData, [name]: value });
      setFormErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validations) {
      const newErrors = {};
      for (const key in validations) {
        const error = validations[key](formData[key], formData);
        if (error) newErrors[key] = error;
      }
      setFormErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formHeader}>
        {entityIcon && <div className={styles.entityIcon}>{entityIcon}</div>}
        <h2 className={styles.formTitle}>
          {item ? t("common.edit") : t("common.create")}
        </h2>
      </div>

      {fields.map((field) => {
        if (!item && field.key === "id") return null;
        const isIdField = field.key === "id";
        const nameKey = getFormKey(field);

        // Determinar si está bloqueado (readOnly / disabled)
        const isFieldReadOnly =
          isIdField ||
          (typeof field.isReadOnly === "function"
            ? field.isReadOnly(item)
            : field.isReadOnly);

        return (
          <div key={field.key} className={styles.formGroup}>
            <label className={styles.label}>{t(field.labelKey)}</label>

            {field.type === "select" ? (
              <select
                name={nameKey}
                value={formData[nameKey] || ""}
                onChange={handleChange}
                disabled={isFieldReadOnly}
                className={`${styles.input} ${
                  formErrors[nameKey] ? styles.inputError : ""
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
                name={nameKey}
                value={formData[nameKey] || ""}
                onChange={handleChange}
                readOnly={isFieldReadOnly}
                className={`${styles.input} ${
                  formErrors[nameKey] ? styles.inputError : ""
                }`}
              />
            )}

            {formErrors[nameKey] && (
              <div className={styles.errorMessage}>{formErrors[nameKey]}</div>
            )}
          </div>
        );
      })}

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
