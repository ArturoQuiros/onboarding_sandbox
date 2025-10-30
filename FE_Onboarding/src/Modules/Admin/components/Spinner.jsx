// Spinner.jsx
import React from "react";
import styles from "./Spinner.module.css";

/**
 * Componente Spinner para indicar estados de carga
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.size="medium"] - Tamaño del spinner (small, medium, large)
 * @param {string} [props.message] - Mensaje opcional a mostrar debajo del spinner
 * @param {boolean} [props.fullScreen=false] - Si true, ocupa toda la pantalla
 */
export const Spinner = ({ size = "medium", message, fullScreen = false }) => {
  const containerClass = fullScreen
    ? styles.fullScreenContainer
    : styles.container;

  return (
    <div className={containerClass}>
      <div className={`${styles.spinner} ${styles[size]}`}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};
