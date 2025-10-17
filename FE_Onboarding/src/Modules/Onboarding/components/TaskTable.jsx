import React from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./TaskTable.module.css";

export const TaskTable = ({
  tasks,
  staffOptions,
  handleAssignChange,
  contractId,
}) => (
  <div className={styles.tableWrap}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Tarea</th>
          <th>Estado</th>
          <th>Encargado</th>
          <th>Observaciones</th>
          <th style={{ textAlign: "center" }}>Acción</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan="5" className={styles.emptyMessage}>
              No se encontraron tareas.
            </td>
          </tr>
        ) : (
          tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td className={styles[`status_${task.status.replace(/ /g, "")}`]}>
                {task.status}
              </td>
              <td>
                <select
                  className={styles.encargadoSelect}
                  value={task.assignedTo}
                  onChange={(e) => handleAssignChange(task.id, e.target.value)}
                >
                  {staffOptions.map((s, i) => (
                    <option key={i} value={s}>
                      {s === "" ? "— No asignado —" : s}
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
                  title="Ir a la tarea"
                >
                  <FaArrowRight />
                </a>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
