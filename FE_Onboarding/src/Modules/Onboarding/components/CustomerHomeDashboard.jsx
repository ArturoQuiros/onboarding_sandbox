import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaArrowRight } from "react-icons/fa";
import styles from "./CustomerHomeDashboard.module.css";

export const CustomerHomeDashboard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Revisión de documentos legales",
      status: "Completada",
      assignedTo: "María Gómez",
      observation: "",
      serviceId: 1,
    },
    {
      id: 2,
      name: "Configuración inicial del sistema",
      status: "En progreso",
      assignedTo: "José Rojas",
      observation: "Falta completar los datos de acceso del cliente.",
      serviceId: 2,
    },
    {
      id: 3,
      name: "Validación del contrato",
      status: "Pendiente",
      assignedTo: "",
      observation: "",
      serviceId: 1,
    },
  ]);

  const staffOptions = ["", "María Gómez", "José Rojas", "Carlos Méndez"];
  const contractId = 1;

  const handleAssignChange = (taskId, newValue) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, assignedTo: newValue } : t))
    );
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completada").length;
  const inProgress = tasks.filter((t) => t.status === "En progreso").length;
  const pending = tasks.filter((t) => t.status === "Pendiente").length;

  const chartData = [
    { name: "Completadas", value: completed },
    { name: "En progreso", value: inProgress },
    { name: "Pendientes", value: pending },
  ];

  const COLORS = ["#4caf50", "#ff9800", "#e81a3b"];

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.title}>Resumen del Contrato</h2>

      <div className={styles.topGrid}>
        <div className={styles.statsGrid}>
          <div className={`${styles.card} ${styles.completed}`}>
            <h3>{completed}</h3>
            <p>Completadas</p>
          </div>
          <div className={`${styles.card} ${styles.inProgress}`}>
            <h3>{inProgress}</h3>
            <p>En progreso</p>
          </div>
          <div className={`${styles.card} ${styles.pending}`}>
            <h3>{pending}</h3>
            <p>Pendientes</p>
          </div>
          <div className={styles.card}>
            <h3>{total}</h3>
            <p>Total</p>
          </div>
        </div>

        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h3 className={styles.subtitle}>Detalle de Tareas</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Estado</th>
            <th>Encargado</th>
            <th>Observaciones</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td className={styles[`status_${task.status.replace(" ", "")}`]}>
                {task.status}
              </td>
              <td>
                <select
                  value={task.assignedTo}
                  onChange={(e) => handleAssignChange(task.id, e.target.value)}
                  className={styles.selectInput}
                >
                  {staffOptions.map((name, idx) => (
                    <option key={idx} value={name}>
                      {name === "" ? "— No asignado —" : name}
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
                  <span className={styles.noObservation}>—</span>
                )}
              </td>
              <td>
                <a
                  href={`http://localhost:5173/client/contract/${contractId}/service/${task.serviceId}/task/${task.id}`}
                  className={styles.actionButton}
                  title="Ir a la tarea"
                >
                  <FaArrowRight />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
