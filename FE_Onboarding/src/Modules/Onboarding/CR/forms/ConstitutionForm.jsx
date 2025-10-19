// src/Modules/Contracts/TaskFlow/forms/ConstitutionForm.jsx (Código del Paso 4, ligeramente ajustado para Next)

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormControls } from "../../components";
import styles from "./ConstitutionForm.module.css";

// ... (PropTypes aquí si los usaras)

export const ConstitutionForm = ({
  initialData = {},
  onSubmitForm,
  onBack,
  canGoBack,
  isSaving,
}) => {
  const { t } = useTranslation("global");

  // Estado local del formulario (usando 'name' del mockTasks)
  const [formData, setFormData] = useState({
    domicilio: initialData.domicilio || "",
    capitalSocial: initialData.capitalSocial || "",
    nombreCompania: initialData.nombreCompania || "",
    objeto: initialData.objeto || "",
  });
  const [validationError, setValidationError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(null);

    // Validación Básica
    if (
      !formData.domicilio ||
      !formData.capitalSocial ||
      !formData.nombreCompania
    ) {
      setValidationError(
        t(
          "form.fillAllFields",
          "Por favor, complete todos los campos requeridos."
        )
      );
      return;
    }

    // Llama a la función de avance del componente padre (OnboardingTaskPage.handleNext)
    onSubmitForm(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          {t("tasks.constitution.title", "Formulario de Constitución")}
        </h2>
        <p className={styles.description}>
          {t(
            "tasks.constitution.description",
            "Complete los datos legales para iniciar el proceso."
          )}
        </p>
      </header>

      {validationError && (
        <div className={styles.errorBanner}>{validationError}</div>
      )}

      {/* Contenedor de Inputs con Layout de 2 Columnas */}
      <div className={styles.inputGrid}>
        <input
          type="text"
          name="nombreCompania"
          placeholder={t("form.nombreCompania", "Nombre de la Compañía")}
          value={formData.nombreCompania}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="capitalSocial"
          placeholder={t("form.capitalSocial", "Capital Social")}
          value={formData.capitalSocial}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="domicilio"
          placeholder={t("form.domicilio", "Domicilio Fiscal")}
          value={formData.domicilio}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="objeto"
          placeholder={t("form.objetoSocial", "Objeto Social (Resumen)")}
          value={formData.objeto}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      {/* ---------------------------------------------------- */}
      {/* CONTROLES DE NAVEGACIÓN Y BOTÓN NEXT */}
      {/* ---------------------------------------------------- */}
      <div className={styles.formControlsWrapper}>
        {/* Los FormControls gestionan Back y Contacto */}
        <FormControls
          onBack={onBack}
          canGoBack={canGoBack}
          isSubmitting={isSaving}
        />

        {/* El botón Submit/Next (DEBE ESTAR DENTRO DEL FORMULARIO) */}
        <button
          type="submit"
          disabled={isSaving}
          className={styles.nextButton} // Usamos la clase definida en el CSS del formulario
        >
          {isSaving
            ? t("common.saving", "Guardando...")
            : t("common.next", "Siguiente")}
        </button>
      </div>
    </form>
  );
};
