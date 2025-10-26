// src/Modules/Admin/components/Crud/ItemsPerPageSelector.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ItemsPerPageSelector.module.css";

export const ItemsPerPageSelector = ({
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const { t } = useTranslation("global");

  // 💡 Handler que convierte el valor de string a Number
  const handleChange = (e) => {
    const numericValue = Number(e.target.value);
    onItemsPerPageChange(numericValue);
  };

  return (
    <div className={styles.itemsPerPage}>
      <label htmlFor="items-per-page">{t("common.itemsPerPage")}</label>
      <select
        id="items-per-page"
        // El 'value' debe ser el valor numérico del estado
        value={itemsPerPage}
        onChange={handleChange} // ✅ Usamos el handler que convierte a número
      >
        {/* Los 'value's de las opciones pueden ser strings, pero el valor del select debe ser el numérico */}
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};
