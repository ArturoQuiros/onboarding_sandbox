import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./TaskCharts.module.css";

export const TaskCharts = ({ tasks }) => {
  const chartByState = useMemo(() => {
    const map = tasks.reduce((acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {});
    const order = [
      "Pendiente",
      "Pendiente de revisión",
      "Aceptada",
      "Devuelta",
    ];
    return order.map((k) => ({ name: k, value: map[k] || 0 }));
  }, [tasks]);

  const chartByAssignee = useMemo(() => {
    const map = tasks.reduce((acc, t) => {
      const key =
        t.assignedTo && t.assignedTo !== "" ? t.assignedTo : "— No asignado —";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [tasks]);

  const COLORS_STATE = ["#e81a3b", "#ff9800", "#4caf50", "#98002e"];
  const COLORS_ASSIGNEE = [
    "#98002e",
    "#e81a3b",
    "#5b6e7f",
    "#333333",
    "#6b7280",
    "#9ca3af",
  ];

  return (
    <div className={styles.chartsRow}>
      <div className={styles.chartBox}>
        <div className={styles.chartTitle}>Tareas por Estado</div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartByState}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
            >
              {chartByState.map((entry, idx) => (
                <Cell
                  key={`s-${idx}`}
                  fill={COLORS_STATE[idx % COLORS_STATE.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartBox}>
        <div className={styles.chartTitle}>Tareas por Encargado</div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartByAssignee}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
            >
              {chartByAssignee.map((entry, idx) => (
                <Cell
                  key={`a-${idx}`}
                  fill={COLORS_ASSIGNEE[idx % COLORS_ASSIGNEE.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
