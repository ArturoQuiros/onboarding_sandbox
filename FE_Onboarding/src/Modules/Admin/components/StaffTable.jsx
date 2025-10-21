// src/Modules/Admin/components/StaffTable.jsx

import React from "react";
import styles from "./StaffTable.module.css";
import { EnableToggle } from "./EnableToggle";
import { RoleSelector } from "./RoleSelector";

export const StaffTable = ({
  staff,
  roles,
  onToggleEnabled,
  onAssignRole,
  // ... (otras props de paginación)
}) => {
  return (
    <div className={styles.staffTable_tableContainer}>
      {staff.length === 0 ? (
        <p className={styles.staffTable_emptyTableMessage}>
          No se encontraron usuarios con los filtros aplicados.
        </p>
      ) : (
        <table className={styles.staffTable_table}>
          <thead className={styles.staffTable_tableHeader}>
            {/* CORRECCIÓN: Asegurarse que no haya espacios ni comentarios aquí */}
            <tr>
              <th className={styles.staffTable_tableHeaderCell}>ID</th>
              <th className={styles.staffTable_tableHeaderCell}>Nombre</th>
              <th className={styles.staffTable_tableHeaderCell}>Email</th>
              <th className={styles.staffTable_tableHeaderCell}>Puesto</th>
              {/* 👈 AÑADIDO */}
              <th className={styles.staffTable_tableHeaderCell}>País</th>
              <th className={styles.staffTable_tableHeaderCell}>Habilitado</th>
              <th className={styles.staffTable_tableHeaderCell}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((user) => (
              // CORRECCIÓN: Asegurarse que no haya espacios ni comentarios aquí
              <tr key={user.id} className={styles.staffTable_tableRow}>
                <td className={styles.staffTable_tableCell}>{user.id}</td>
                <td className={styles.staffTable_tableCell}>{user.name}</td>
                <td className={styles.staffTable_tableCell}>{user.email}</td>
                <td className={styles.staffTable_tableCell}>{user.puesto}</td>
                {/* 👈 AÑADIDO */}
                <td className={styles.staffTable_tableCell}>
                  {user.countryName}
                </td>
                <td className={styles.staffTable_tableCell}>
                  <div className={styles.staffTable_actionCellWrapper}>
                    <EnableToggle
                      enabled={user.enabled}
                      onChange={() => onToggleEnabled(user.id, user.enabled)}
                    />
                  </div>
                </td>
                <td className={styles.staffTable_tableCell}>
                  <div className={styles.staffTable_actionCellWrapper}>
                    <RoleSelector
                      currentRoleId={user.roleId}
                      roles={roles}
                      onChange={(newRoleId) => onAssignRole(user.id, newRoleId)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
