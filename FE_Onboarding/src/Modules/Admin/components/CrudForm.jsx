import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UIContext } from "../../../Global/Context";
import styles from "./CrudForm.module.css";
import { FiEye, FiEyeOff, FiRefreshCcw } from "react-icons/fi";

export const CrudForm = ({ fields, item, onSave, onCancel, validations }) => {
  const { t } = useTranslation("global");
  const { entityIcon } = useContext(UIContext);

  const getFormKey = (field) => field.formKey || field.key;

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState({});

  useEffect(() => {
    const initialData = {};
    fields.forEach((field) => {
      const key = getFormKey(field);
      if (item) {
        if (field.transformForEdit) {
          Object.assign(initialData, field.transformForEdit(item));
        } else {
          initialData[key] = item[key];
        }
      } else {
        if (key !== "id") initialData[key] = "";
        else initialData[key] = item?.[key] ?? "";
      }
    });
    setFormData(initialData);
    setFormErrors({});
  }, [item, fields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "radio" ? value === "true" : value;
    setFormData((prev) => ({ ...prev, [name]: val }));

    if (validations && validations[name]) {
      const error = validations[name](val, { ...formData, [name]: val });
      setFormErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const togglePasswordVisibility = (key) => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const generatePassword = (length = 12) => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let dataToSave = formData;

    if (validations) {
      const newErrors = {};
      for (const key in validations) {
        const error = validations[key](dataToSave[key], dataToSave);
        if (error) newErrors[key] = error;
      }
      setFormErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;
    }

    fields.forEach((field) => {
      if (field.transformForSave) {
        dataToSave = field.transformForSave(dataToSave);
      }
    });

    onSave(dataToSave);
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

        const isFieldReadOnly =
          isIdField ||
          (typeof field.isReadOnly === "function"
            ? field.isReadOnly(item)
            : field.isReadOnly);

        const formDataValue = formData[nameKey];

        // Render de cada tipo de campo
        return (
          <div key={field.key} className={styles.formGroup}>
            <label className={styles.label}>{t(field.labelKey)}</label>

            {field.type === "select" ? (
              <select
                name={nameKey}
                value={formDataValue || ""}
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
            ) : field.type === "textarea" ? (
              <textarea
                name={nameKey}
                value={formDataValue || ""}
                onChange={handleChange}
                readOnly={isFieldReadOnly}
                rows={field.rows || 5}
                className={`${styles.input} ${
                  formErrors[nameKey] ? styles.inputError : ""
                }`}
              />
            ) : field.type === "password" ? (
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword[nameKey] ? "text" : "password"}
                  name={nameKey}
                  value={formDataValue || ""}
                  onChange={handleChange}
                  readOnly={isFieldReadOnly}
                  className={`${styles.input} ${
                    formErrors[nameKey] ? styles.inputError : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(nameKey)}
                  className={styles.showPasswordButton}
                  tabIndex={-1}
                >
                  {showPassword[nameKey] ? <FiEyeOff /> : <FiEye />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const generated = generatePassword();
                    setFormData((prev) => ({ ...prev, [nameKey]: generated }));
                  }}
                  className={styles.generatePasswordButton}
                  tabIndex={-1}
                >
                  <FiRefreshCcw />
                </button>
              </div>
            ) : field.type === "radio" ? (
              <div className={styles.radioGroup}>
                {field.options?.map((opt) => (
                  <label key={opt.value} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name={nameKey}
                      value={opt.value}
                      checked={formDataValue === opt.value}
                      onChange={handleChange}
                      disabled={isFieldReadOnly}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            ) : (
              <input
                type={field.type || "text"}
                name={nameKey}
                value={formDataValue || ""}
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
