// src/Modules/Admin/components/Crud/TaskTable.jsx (Ajustado)
import React, { useMemo } from "react";
import styles from "./TaskTable.module.css";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const TaskTable = ({
  tasks, // Ahora se espera que 'tasks' contenga solo los elementos de la página actual
  staffOptions,
  contractId,
  currentPage,
  totalPages,
  itemsPerPage,
  filteredCount, // <-- AÑADIDO: Total de tareas filtradas (similar a CrudDataTable)
  onPageChange,
  handleAssignChange,
}) => {
  const { t } = useTranslation("global"); // Cálculo de índices de inicio y fin (igual que CrudDataTable)

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, filteredCount); // Usa filteredCount // Se elimina 'paginatedTasks' y el useMemo ya que 'tasks' ya debe estar paginado.

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t("tasks.task")}</th>
            <th>{t("tasks.status")}</th>
            <th>{t("tasks.assignee")}</th>
            <th>{t("tasks.observation")}</th>
            <th style={{ textAlign: "center" }}>{t("common.action")}</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? ( // Usa 'tasks.length' que es la data de la página
            <tr>
              <td colSpan="5" className={styles.emptyMessage}>
                {t("common.noData")}
              </td>
            </tr>
          ) : (
            tasks.map(
              (
                task // Itera sobre 'tasks' directamente
              ) => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td
                    className={
                      styles[`status_${task.status.replace(/ /g, "")}`]
                    }
                  >
                    {t(`tasks.statuses.${task.status.replace(/ /g, "")}`)}
                  </td>

                  <td>
                    <select
                      className={styles.encargadoSelect}
                      value={task.assignedTo}
                      onChange={(e) =>
                        handleAssignChange(task.id, e.target.value)
                      }
                    >
                      {staffOptions.map((s, i) => (
                        <option key={i} value={s}>
                          {s === "" ? t("tasks.notAssigned") : s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    {task.observation ? (
                      <span className={styles.observationNote}>
                        💬 {task.observation}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <a
                      href={`http://localhost:5173/client/contract/${contractId}/service/${task.serviceId}/task/${task.id}`}
                      className={styles.actionButton}
                      title={t("common.goToTask")}
                    >
                      <FaArrowRight />
                    </a>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
      {/* Footer con paginación y info - ESTILO CrudDataTable */}
      {tasks.length > 0 && (
        <div className={styles.tableFooter}>
          <span className={styles.recordsInfo}>
            {t("common.showingRecords", {
              from: startIndex,
              to: endIndex,
              total: filteredCount, // Usa filteredCount
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
      )}
    </div>
  );
};
