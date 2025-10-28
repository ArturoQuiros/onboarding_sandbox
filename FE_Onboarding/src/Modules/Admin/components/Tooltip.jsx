import React from "react";
import styles from "./Tooltip.module.css";

/**
 * Tooltip genérico reutilizable
 * @param {ReactNode} children - Elemento que activará el tooltip al pasar el mouse.
 * @param {string} text - Texto que se mostrará dentro del tooltip.
 * @param {"top"|"bottom"|"left"|"right"} position - Posición opcional (default: "top").
 */
export const Tooltip = ({ children, text, position = "top" }) => {
  return (
    <div className={`${styles.tooltipContainer} ${styles[position]}`}>
      {children}
      <span className={styles.tooltipText}>{text}</span>
    </div>
  );
};

export default Tooltip;
