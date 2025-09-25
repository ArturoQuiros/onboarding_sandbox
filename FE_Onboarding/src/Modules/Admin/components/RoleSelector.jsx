import React from "react";
import styles from "./RoleSelector.module.css";

export const RoleSelector = ({ role, onChange }) => {
  return (
    <select
      value={role}
      onChange={(e) => onChange(e.target.value)}
      className={styles.select}
    >
      <option value="Admin">Admin</option>
      <option value="User">User</option>
      <option value="Viewer">Viewer</option>
    </select>
  );
};
