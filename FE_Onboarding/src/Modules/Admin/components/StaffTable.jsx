// src/Modules/Admin/components/StaffTable.jsx

import React from "react";
import styles from "./StaffTable.module.css";
import { EnableToggle } from "./EnableToggle";
import { RoleSelector } from "./RoleSelector";
import { useTranslation } from "react-i18next";

export const StaffTable = ({
  staff,
  roles,
  fields, // 👈 Se recibe la configuración de columnas
  onToggleEnabled,
  onAssignRole, // ... (otras props de paginación)
}) => {
  const { t } = useTranslation("global");

  return (
    <div className={styles.staffTable_tableContainer}>
      {staff.length === 0 ? (
        <p className={styles.staffTable_emptyTableMessage}>
          No se encontraron usuarios con los filtros aplicados.
        </p>
      ) : (
        <table className={styles.staffTable_table}>
          <thead className={styles.staffTable_tableHeader}>
            <tr>
              {/* 1. Encabezados de Datos Dinámicos */}

              {fields.map((field) => (
                <th
                  key={field.key}
                  className={styles.staffTable_tableHeaderCell}
                >
                  {field.label} {/* Nombre traducido */}
                </th>
              ))}
              {/* 2. Encabezados Fijos (Estado y Rol) */}
              <th className={styles.staffTable_tableHeaderCell}>
                {t("staffDashboard.table.status")}
              </th>

              <th className={styles.staffTable_tableHeaderCell}>
                {t("staffDashboard.table.role")}
              </th>
            </tr>
          </thead>

          <tbody>
            {staff.map((user) => (
              <tr key={user.id} className={styles.staffTable_tableRow}>
                {/* 1. Celdas de Datos Dinámicas */}
                {fields.map((field) => (
                  <td key={field.key} className={styles.staffTable_tableCell}>
                    {user[field.key]}
                  </td>
                ))}
                {/* 2. Celda de Estado (Toggle) */}

                <td className={styles.staffTable_tableCell}>
                  <div className={styles.staffTable_actionCellWrapper}>
                    <EnableToggle
                      enabled={user.enabled}
                      onChange={() => onToggleEnabled(user.id, user.enabled)}
                    />
                  </div>
                </td>
                {/* 3. Celda de Rol (RoleSelector) */}

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
