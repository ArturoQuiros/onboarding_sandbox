// src/Modules/Admin/components/Crud/ItemsPerPageSelector.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ItemsPerPageSelector.module.css";

export const ItemsPerPageSelector = ({
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const { t } = useTranslation("global");

  return (
    <div className={styles.itemsPerPage}>
      <label htmlFor="items-per-page">{t("common.itemsPerPage")}</label>
      <select
        id="items-per-page"
        value={itemsPerPage}
        onChange={onItemsPerPageChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};
