// src/Modules/Admin/components/Crud/DataTable.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { BsPencil, BsTrash } from "react-icons/bs";
import styles from "./DataTable.module.css";

export const DataTable = ({ data, fields, onEdit, onDelete }) => {
  const { t } = useTranslation("global");

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            {fields.map((field) => (
              <th key={field.key} className={styles.tableHeaderCell}>
                {t(field.labelKey)}
              </th>
            ))}
            <th className={styles.tableHeaderCell}>{t("common.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className={styles.tableRow}>
              {fields.map((field) => (
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
          {data.length === 0 && (
            <tr>
              <td
                colSpan={fields.length + 1}
                className={styles.emptyTableMessage}
              >
                {t("common.noData")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
