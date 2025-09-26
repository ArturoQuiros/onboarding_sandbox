// src/Modules/Admin/components/Crud/CrudDataTable.jsx

import React, { useMemo } from "react"; // 👈 Añadido useMemo
import { useTranslation } from "react-i18next";
import {
  BsPencil,
  BsTrash,
  BsArrowUpShort,
  BsArrowDownShort,
} from "react-icons/bs";
import styles from "./CrudDataTable.module.css";

export const CrudDataTable = ({
  data,
  fields,
  onEdit,
  onDelete,
  currentPage,
  itemsPerPage,
  filteredCount,
  totalPages,
  onPageChange,
  onSort,
  sortKey,
  sortDirection,
}) => {
  const { t } = useTranslation("global");

  // 🛠️ MODIFICACIÓN CLAVE: Filtramos los campos que son visibles en la tabla.
  const visibleFields = useMemo(() => {
    return fields.filter(
      (field) => field.isTableVisible !== false && field.isHidden !== true
    );
  }, [fields]);

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, filteredCount);

  return (
    <div className={styles.tableContainer}>
      {data.length === 0 ? (
        <p className={styles.emptyTableMessage}>{t("common.noData")}</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                {/* 1. Usamos visibleFields en lugar de fields para los encabezados */}
                {visibleFields.map((field) => (
                  <th
                    key={field.key}
                    className={styles.tableHeaderCell}
                    onClick={() => onSort(field.key)}
                  >
                    {t(field.labelKey)}
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
                <th className={styles.tableHeaderCell}>
                  {t("common.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className={styles.tableRow}>
                  {/* 2. Usamos visibleFields en lugar de fields para las celdas */}
                  {visibleFields.map((field) => (
                    <td key={field.key} className={styles.tableCell}>
                      {item[field.key]}
                    </td>
                  ))}
                  <td className={`${styles.tableCell} ${styles.actionsCell}`}>
                    <button
                      onClick={() => onEdit(item)}
                      className={styles.editButton}
                    >
                      <BsPencil />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className={styles.deleteButton}
                    >
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ... Footer y Paginación (sin cambios) ... */}
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
