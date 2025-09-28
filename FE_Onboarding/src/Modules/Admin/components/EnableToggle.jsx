import React from "react";
import styles from "./EnableToggle.module.css";

export const EnableToggle = ({ enabled, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={enabled}
      onChange={onChange}
      className={styles.toggle}
    />
  );
};
