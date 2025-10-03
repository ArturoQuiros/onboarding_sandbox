// src/Modules/Admin/components/ContractServicesTable.jsx

import React from "react";
import styles from "./ContractServicesTable.module.css";
// 📌 IMPORTAR ICONOS DE ORDENACIÓN (Asumimos que están instalados)
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";

export const ContractServicesTable = ({
  services,
  assignedServiceIds,
  isSaving,
  onToggle,
  onSort,
  sortKey,
  sortDirection,
  // PROPS DE PAGINACIÓN
  currentPage,
  totalPages,
  filteredCount,
  onPageChange,
}) => {
  // 📌 NOTA: Eliminada la función getSortIndicator para usar los iconos de React directamente.

  // Lógica para el mensaje de registros mostrados, imitando CrudDataTable
  const itemsPerPage = services.length > 0 ? filteredCount / totalPages : 0;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + services.length - 1, filteredCount);

  if (services.length === 0 && !isSaving) {
    return (
      <div className={styles.emptyTableMessage}>
        No hay servicios disponibles para gestionar.
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            {/* COLUMNA ID */}
            <th
              className={styles.tableHeaderCell}
              onClick={() => onSort("id")}
              style={{ cursor: "pointer" }}
            >
              ID
              {sortKey === "id" && (
                <span>
                  {sortDirection === "asc" ? (
                    <BsArrowUpShort className={styles.sortIcon} />
                  ) : (
                    <BsArrowDownShort className={styles.sortIcon} />
                  )}
                </span>
              )}
            </th>

            {/* COLUMNA SERVICIO (NOMBRE) */}
            <th
              className={styles.tableHeaderCell}
              onClick={() => onSort("nombre")}
              style={{ cursor: "pointer" }}
            >
              Servicio
              {sortKey === "nombre" && (
                <span>
                  {sortDirection === "asc" ? (
                    <BsArrowUpShort className={styles.sortIcon} />
                  ) : (
                    <BsArrowDownShort className={styles.sortIcon} />
                  )}
                </span>
              )}
            </th>

            {/* COLUMNA CONTRATADO (Acciones) */}
            <th
              // CrudDataTable usa solo .tableHeaderCell en la última columna, pero aplicaremos el último para el estilo de redondeo
              className={`${styles.tableHeaderCell} ${styles.tableHeaderCellLast}`}
              style={{ cursor: "default" }}
            >
              Contratado {/* Similar a t("common.actions") */}
            </th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className={styles.tableRow}>
              <td className={styles.tableCell}>{service.id}</td>
              <td className={styles.tableCell}>{service.nombre}</td>
              {/* Aquí usamos tableCellLast para centrar el checkbox */}
              <td className={`${styles.tableCell} ${styles.tableCellLast}`}>
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

      {/* PIE DE PÁGINA Y PAGINACIÓN (Ahora idéntico a CrudDataTable) */}
      <div className={styles.tableFooter}>
        <span className={styles.recordsInfo}>
          {/* 📌 Adaptado para coincidir con la estructura del mensaje de CrudDataTable */}
          Mostrando {startIndex} a {endIndex} de {filteredCount} resultados.
        </span>

        <div className={styles.paginationControls}>
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isSaving}
          >
            Anterior {/* Similar a t("common.previous") */}
          </button>

          {/* 📌 Eliminado el span de 'Página X de Y' para imitar a CrudDataTable */}

          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isSaving}
          >
            Siguiente {/* Similar a t("common.next") */}
          </button>
        </div>
      </div>
    </div>
  );
};
