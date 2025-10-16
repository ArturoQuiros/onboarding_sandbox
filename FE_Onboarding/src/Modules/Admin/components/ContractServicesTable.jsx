// src/Modules/Admin/components/ContractServicesTable.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ContractServicesTable.module.css";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";

/**
 * Componente que muestra la tabla de servicios disponibles para un contrato
 * y permite activar/desactivar la asignación de cada servicio.
 * (Tu código original, sin cambios)
 */
export const ContractServicesTable = ({
  services,
  assignedServiceIds,
  isSaving,
  onToggle,
  onSort,
  sortKey,
  sortDirection,
  currentPage,
  totalPages,
  filteredCount,
  onPageChange,
}) => {
  const { t } = useTranslation("global");

  // Calcula el índice de inicio y fin para el mensaje de pie de página
  // Nota: La lógica de itemsPerPage podría ser imprecisa si filteredCount / totalPages no es exacto,
  // pero mantendremos tu lógica original.
  const itemsPerPage =
    filteredCount > 0 ? Math.ceil(filteredCount / totalPages) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + services.length - 1, filteredCount);

  if (services.length === 0 && !isSaving) {
    return <div className={styles.emptyTableMessage}>{t("common.noData")}</div>;
  }

  // Renderiza el indicador de ordenación (flecha arriba/abajo)
  const renderSortIndicator = (key) => {
    if (sortKey !== key) return null;
    return (
      <span>
        {sortDirection === "asc" ? (
          <BsArrowUpShort className={styles.sortIcon} />
        ) : (
          <BsArrowDownShort className={styles.sortIcon} />
        )}
      </span>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            {/* Columna ID (Ordenable) */}
            <th
              className={styles.tableHeaderCell}
              onClick={() => onSort("id")}
              style={{ cursor: "pointer" }}
            >
              {t("services.table.id")}
              {renderSortIndicator("id")}
            </th>

            {/* Columna Servicio/Nombre (Ordenable) */}
            <th
              className={styles.tableHeaderCell}
              onClick={() => onSort("nombre")}
              style={{ cursor: "pointer" }}
            >
              {t("services.table.name")}
              {renderSortIndicator("nombre")}
            </th>

            {/* Columna Contratado/Acciones (Fija) */}
            <th
              className={`${styles.tableHeaderCell} ${styles.tableHeaderCellLast}`}
              style={{ cursor: "default" }}
            >
              {t("common.actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className={styles.tableRow}>
              <td className={styles.tableCell}>{service.id}</td>
              <td className={styles.tableCell}>{service.nombre}</td>
              <td className={`${styles.tableCell} ${styles.tableCellLast}`}>
                {/* Checkbox de asignación/desasignación */}
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={assignedServiceIds.has(service.id)}
                  disabled={isSaving}
                  onChange={(e) => onToggle(service.id, e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pie de página con información de paginación y controles */}
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
            className={styles.paginationButton}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isSaving}
          >
            {t("common.previous")}
          </button>

          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isSaving}
          >
            {t("common.next")}
          </button>
        </div>
      </div>
    </div>
  );
};
