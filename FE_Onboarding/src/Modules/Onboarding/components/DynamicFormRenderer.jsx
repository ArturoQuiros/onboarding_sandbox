// src/Modules/Contracts/TaskFlow/components/DynamicFormRenderer.jsx

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
// 🎯 Importar todos los formularios específicos que quieres renderizar
import { ConstitutionForm } from "../CR/forms";
// import { SocietyTypeSelector } from '../forms/SocietyTypeSelector';
// import { PaymentUploader } from '../forms/PaymentUploader';
import styles from "./DynamicFormRenderer.module.css"; // Opcional, solo si necesitas estilos específicos

/**
 * Mapa central que asocia una clave de texto (viene del estado de la tarea)
 * con el componente de formulario de React real.
 */
const COMPONENT_MAP = {
  // La clave debe coincidir con la propiedad 'component' en tu objeto de tarea
  ConstitutionForm: ConstitutionForm,
  // SocietyTypeSelector: SocietyTypeSelector,
  // PaymentUploader: PaymentUploader,
  // ... agrega más formularios aquí a medida que los crees
};

/**
 * Componente que renderiza dinámicamente el formulario activo.
 *
 * @param {string} componentKey - La clave (nombre) del formulario a renderizar.
 * @param {object} initialData - Datos precargados para el formulario.
 * @param {function} onNext - Función para guardar y avanzar (handleNext de ServiceTaskPage).
 * @param {function} onBack - Función para retroceder.
 * @param {boolean} canGoBack - Indica si se permite retroceder.
 * @param {boolean} isSaving - Indica si el formulario se está guardando (para deshabilitar botones).
 * @returns {JSX.Element}
 */
export const DynamicFormRenderer = ({
  componentKey,
  initialData,
  onNext,
  onBack,
  canGoBack,
  isSaving,
}) => {
  const { t } = useTranslation("global");

  // Usamos useMemo para buscar el componente solo cuando la clave cambie
  const ActiveForm = useMemo(() => COMPONENT_MAP[componentKey], [componentKey]);

  if (!componentKey) {
    return (
      <div className={styles.messageContainer}>
        <h2 className={styles.errorTitle}>{t("renderer.noTaskSelected")}</h2>
      </div>
    );
  }

  if (!ActiveForm) {
    return (
      <div className={styles.messageContainer}>
        <h2 className={styles.errorTitle}>
          {t("renderer.formNotFound", { key: componentKey })}
        </h2>
        <p className={styles.errorDescription}>
          {t("renderer.checkComponentMap")}
        </p>
      </div>
    );
  }

  // 🎯 Renderiza el componente de formulario encontrado, inyectando todas las props
  return (
    <ActiveForm
      initialData={initialData}
      onSubmitForm={onNext} // Esto conecta el submit del formulario con el handleNext de la Page
      onBack={onBack}
      canGoBack={canGoBack}
      isSaving={isSaving}
    />
  );
};
