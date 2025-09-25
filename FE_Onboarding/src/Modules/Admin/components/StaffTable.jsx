import React from "react";
import styles from "./StaffTable.module.css";
import { EnableToggle } from "./EnableToggle";
import { RoleSelector } from "./RoleSelector";

export const StaffTable = ({ staff, onToggleEnabled, onAssignRole }) => {
  return (
    <div className={styles.staffTable_tableContainer}>
      {staff.length === 0 ? (
        <p className={styles.staffTable_emptyTableMessage}>No hay usuarios</p>
      ) : (
        <table className={styles.staffTable_table}>
          <thead className={styles.staffTable_tableHeader}>
            <tr>
              <th className={styles.staffTable_tableHeaderCell}>ID</th>
              <th className={styles.staffTable_tableHeaderCell}>Nombre</th>
              <th className={styles.staffTable_tableHeaderCell}>Puesto</th>
              <th className={styles.staffTable_tableHeaderCell}>Habilitado</th>
              <th className={styles.staffTable_tableHeaderCell}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((user) => (
              <tr key={user.id} className={styles.staffTable_tableRow}>
                <td className={styles.staffTable_tableCell}>{user.id}</td>
                <td className={styles.staffTable_tableCell}>{user.name}</td>
                <td className={styles.staffTable_tableCell}>{user.position}</td>

                {/* Columna Habilitado: Quitamos la clase de acción del TD */}
                <td className={styles.staffTable_tableCell}>
                  {/* El wrapper es el que aplica la centralización */}
                  <div className={styles.staffTable_actionCellWrapper}>
                    <EnableToggle
                      enabled={user.enabled}
                      onChange={() => onToggleEnabled(user.id)}
                    />
                  </div>
                </td>

                {/* Columna Rol: Quitamos la clase de acción del TD */}
                <td className={styles.staffTable_tableCell}>
                  {/* El wrapper es el que aplica la centralización */}
                  <div className={styles.staffTable_actionCellWrapper}>
                    <RoleSelector
                      role={user.role}
                      onChange={(newRole) => onAssignRole(user.id, newRole)}
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
