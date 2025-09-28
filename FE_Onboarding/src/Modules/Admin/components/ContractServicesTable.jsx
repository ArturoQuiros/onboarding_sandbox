import React from "react";
import styles from "./ContractServicesTable.module.css"; // Correcto

export const ContractServicesTable = ({
  services,
  assignedServiceIds,
  isSaving,
  onToggle,
}) => {
  // ... (El resto del código usando {styles.clase})
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
            <th className={styles.tableHeaderCell}>ID</th>
            <th className={styles.tableHeaderCell}>Servicio</th>
            <th
              className={`${styles.tableHeaderCell} ${styles.tableHeaderCellLast}`}
            >
              Contratado
            </th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className={styles.tableRow}>
              <td className={styles.tableCell}>{service.id}</td>
              <td className={styles.tableCell}>{service.nombre}</td>
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
    </div>
  );
};
