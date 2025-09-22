// src/Modules/Admin/components/Crud/ConfirmModal.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ConfirmModal.module.css";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";

export const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  messageKey,
  type,
}) => {
  const { t } = useTranslation("global");

  if (!isOpen) {
    return null;
  }

  // Define el ícono a mostrar según el tipo de acción
  const getIcon = () => {
    switch (type) {
      case "delete":
        return (
          <FaTrash className={`${styles.modalIcon} ${styles.deleteIcon}`} />
        );
      case "warning":
        return (
          <FaExclamationTriangle
            className={`${styles.modalIcon} ${styles.warningIcon}`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {getIcon()} {/* ✅ Agregamos el ícono aquí */}
        <h3 className={styles.modalTitle}>{t("common.confirmAction")}</h3>
        <p className={styles.modalMessage}>{t(messageKey)}</p>
        <div className={styles.modalButtons}>
          <button
            onClick={onConfirm}
            className={`${styles.button} ${styles.confirmButton}`}
          >
            {t("common.delete")}
          </button>
          <button
            onClick={onCancel}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            {t("common.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};
