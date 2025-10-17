import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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

  // Función para mostrar valor dentro del gráfico de pastel
  const renderLabelInside = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {value}
      </text>
    );
  };

  return (
    <div className={styles.chartsRow}>
      {/* Gráfico de pastel por estado */}
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
              label={renderLabelInside}
              labelLine={false}
            >
              {chartByState.map((entry, idx) => (
                <Cell
                  key={`s-${idx}`}
                  fill={COLORS_STATE[idx % COLORS_STATE.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="middle" align="left" layout="vertical" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de barras por encargado */}
      <div className={styles.chartBox}>
        <div className={styles.chartTitle}>Tareas por Encargado</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={chartByAssignee}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend verticalAlign="middle" align="left" layout="vertical" />
            <Bar dataKey="value">
              {chartByAssignee.map((entry, idx) => (
                <Cell
                  key={`a-${idx}`}
                  fill={COLORS_ASSIGNEE[idx % COLORS_ASSIGNEE.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
