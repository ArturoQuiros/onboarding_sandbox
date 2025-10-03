// src/Modules/Contracts/TaskFlow/components/FormControls.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./FormControls.module.css";

/**
 * Componente que renderiza los botones de navegación (Back/Next) y la acción de contacto.
 * * NOTA: El botón 'Next' debe ser de tipo 'submit' y pertenecer al <form> padre
 * para disparar la validación y el envío de datos. En este caso, el formulario
 * padre (e.g., ConstitutionForm) debe usar este componente e incluir el botón 'Next'
 * para garantizar el envío del formulario.
 *
 * @param {function} onBack - Función para navegar a la tarea anterior.
 * @param {boolean} canGoBack - Indica si se permite la navegación hacia atrás.
 * @param {boolean} isSubmitting - Indica si el formulario se está guardando actualmente.
 * @returns {JSX.Element}
 */
export const FormControls = ({ onBack, canGoBack, isSubmitting }) => {
  const { t } = useTranslation("global");

  // Función para manejar el clic en el botón de contacto
  const handleKAMContact = () => {
    // Lógica futura: Abrir un modal, iniciar un chat, o navegar a una página de contacto.
    alert(t("common.contactingKAM"));
  };

  return (
    <div className={styles.controlsContainer}>
      {/* Grupo de Navegación (Izquierda: Back, Derecha: Next) */}
      <div className={styles.navigationGroup}>
        <button
          type="button" // Es un botón normal que llama a la función de retroceso
          onClick={onBack}
          disabled={!canGoBack || isSubmitting}
          className={`${styles.button} ${styles.backButton}`}
        >
          {t("common.back")}
        </button>

        {/* El botón 'Next' (o 'Save & Continue') NO se incluye aquí. 
                  Debe estar DENTRO del componente de Formulario (e.g., ConstitutionForm.jsx) 
                  y ser de tipo="submit" para que el <form> padre lo capture y ejecute la validación.
                  Aquí solo dejamos el espacio y los controles.
                */}
      </div>

      {/* Botón de Contacto (Derecha) */}
      <button
        type="button"
        onClick={handleKAMContact}
        className={`${styles.button} ${styles.contactButton}`}
        disabled={isSubmitting}
      >
        {t("common.talkToKAM")}
      </button>
    </div>
  );
};
