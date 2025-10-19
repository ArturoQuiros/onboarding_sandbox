// src/Modules/Admin/components/RoleSelector.jsx

import React from "react";
import styles from "./RoleSelector.module.css";

/**
 * Componente de selección de rol dinámico.
 * @param {object} props
 * @param {number} props.currentRoleId - El ID del rol seleccionado actualmente.
 * @param {Array<{id: number, nombre: string}>} props.roles - La lista de roles disponibles.
 * @param {Function} props.onChange - Función a llamar cuando se selecciona un nuevo rol.
 */
export const RoleSelector = ({ currentRoleId, roles = [], onChange }) => {
  // 👈 1. Recibimos 'currentRoleId' y la lista de 'roles'
  return (
    <select
      value={currentRoleId} // 👈 2. El valor del select es el ID del rol actual
      onChange={(e) => onChange(Number(e.target.value))} // 👈 3. Devolvemos el ID numérico del rol
      className={styles.select}
    >
      {/* 4. Mapeamos la lista de roles para crear las opciones dinámicamente */}
      {roles.map((role) => (
        <option key={role.id} value={role.id}>
          {role.nombre}
        </option>
      ))}
    </select>
  );
};
