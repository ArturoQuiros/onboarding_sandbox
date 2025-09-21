import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ConfirmModal.module.css";

export const ConfirmModal = ({ isOpen, onConfirm, onCancel, messageKey }) => {
  const { t } = useTranslation("global");

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
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
