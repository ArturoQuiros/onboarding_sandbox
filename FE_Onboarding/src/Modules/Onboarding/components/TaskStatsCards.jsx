import React from "react";
import styles from "./TaskStatsCards.module.css";

export const TaskStatsCards = ({ totals }) => (
  <div className={styles.topStats}>
    <div className={styles.statCard}>
      <div className={styles.statNumber}>{totals.total}</div>
      <div className={styles.statLabel}>Total</div>
    </div>
    <div className={styles.statCard}>
      <div className={styles.statNumber}>{totals.completed}</div>
      <div className={styles.statLabel}>Aceptadas</div>
    </div>
    <div className={styles.statCard}>
      <div className={styles.statNumber}>{totals.inReview}</div>
      <div className={styles.statLabel}>Pendiente de revisión</div>
    </div>
    <div className={styles.statCard}>
      <div className={styles.statNumber}>{totals.pending}</div>
      <div className={styles.statLabel}>Pendientes</div>
    </div>
    <div className={styles.statCard}>
      <div className={styles.statNumber}>{totals.returned}</div>
      <div className={styles.statLabel}>Devueltas</div>
    </div>
  </div>
);
