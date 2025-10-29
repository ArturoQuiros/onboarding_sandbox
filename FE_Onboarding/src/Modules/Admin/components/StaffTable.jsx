// src/Modules/Admin/components/StaffTable.jsx

import React from "react";
import styles from "./StaffTable.module.css";
import { EnableToggle } from "./EnableToggle";
import { RoleSelector } from "./RoleSelector";
import { useTranslation } from "react-i18next";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";

export const StaffTable = ({
  staff,
  roles,
  fields,
  onToggleEnabled,
  onAssignRole,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  filteredCount,
  onSort,
  sortKey,
  sortDirection,
}) => {
  const { t } = useTranslation("global"); // Cálculo de índices para el footer

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, filteredCount);

  return (
    <div className={styles.staffTable_tableContainer}>
      {staff.length === 0 ? (
        <p className={styles.staffTable_emptyTableMessage}>
          {t("common.noData")}
        </p>
      ) : (
        <>
          <table className={styles.staffTable_table}>
            <thead className={styles.staffTable_tableHeader}>
              <tr>
                {/* 1. Encabezados de Datos Dinámicos (con Ordenación) */}

                {fields.map((field) => (
                  <th
                    key={field.key}
                    className={styles.staffTable_tableHeaderCell} // Permite ordenar solo si la propiedad 'sortable' no es false
                    onClick={() =>
                      field.sortable !== false && onSort(field.key)
                    }
                  >
                    {field.label}
                    {/* Indicador de ordenación */}
                    {sortKey === field.key && (
                      <span>
                        {sortDirection === "asc" ? (
                          <BsArrowUpShort className={styles.sortIcon} />
                        ) : (
                          <BsArrowDownShort className={styles.sortIcon} />
                        )}
                      </span>
                    )}
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
                        onChange={(newRoleId) =>
                          onAssignRole(user.id, newRoleId)
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Footer de la Tabla (Paginación) */}
          <div className={styles.tableFooter}>
            <span className={styles.recordsInfo}>
              {t("common.showingRecords", {
                from: startIndex,
                to: endIndex,
                total: filteredCount,
              })}
            </span>

            <div className={styles.paginationControls}>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.paginationButton}
              >
                {t("common.previous")}
              </button>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
              >
                {t("common.next")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
