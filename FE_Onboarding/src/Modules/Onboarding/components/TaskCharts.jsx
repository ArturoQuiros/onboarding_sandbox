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
import { useTranslation } from "react-i18next";
import styles from "./TaskCharts.module.css";

// 🎨 Nueva paleta de colores BDO según los estados
const BDO_COLORS = {
  Devuelta: "#e81a3b", // Rojo crítico
  Pendiente: "#d67900", // Dorado (pendiente)
  "Pendiente de revisión": "#008fd2", // Azul (revisión)
  Aceptada: "#009966", // Verde (éxito)
};

// 🎨 Colores de encargado actualizados (para BarChart)
const COLORS_ASSIGNEE = [
  "#008fd2",
  "#e81a3b",
  "#d67900",
  "#009966",
  "#5b6e7f",
  "#9ca3af",
];

export const TaskCharts = ({ tasks }) => {
  const { t } = useTranslation("global"); // 👈 Usa tu namespace (por ejemplo "dashboard")

  const chartByState = useMemo(() => {
    const map = tasks.reduce((acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {});

    const order = [
      "Devuelta",
      "Pendiente",
      "Pendiente de revisión",
      "Aceptada",
    ];

    return order.map((k) => ({
      name: t(`statuses.${k}`), // 👈 Traducción dinámica
      value: map[k] || 0,
    }));
  }, [tasks, t]);

  const chartByAssignee = useMemo(() => {
    const map = tasks.reduce((acc, task) => {
      const key =
        task.assignedTo && task.assignedTo !== ""
          ? task.assignedTo
          : t("no_assignee");
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [tasks, t]);

  const COLORS_STATE_ARRAY = [
    BDO_COLORS["Devuelta"],
    BDO_COLORS["Pendiente"],
    BDO_COLORS["Pendiente de revisión"],
    BDO_COLORS["Aceptada"],
  ];

  const renderLabelInside = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }) => {
    if (value === 0) return null;
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
      {/* 🟢 Gráfico 1: Donut por Estado */}
      <div className={styles.chartBox}>
        <div className={styles.chartTitle}>{t("charts.by_status")}</div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartByState}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={2}
              label={renderLabelInside}
              labelLine={false}
            >
              {chartByState.map((entry, idx) => (
                <Cell
                  key={`s-${idx}`}
                  fill={COLORS_STATE_ARRAY[idx % COLORS_STATE_ARRAY.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="middle" align="left" layout="vertical" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🟣 Gráfico 2: Barras por Encargado */}
      <div className={styles.chartBox}>
        <div className={styles.chartTitle}>{t("charts.by_assignee")}</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={chartByAssignee}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill={COLORS_ASSIGNEE[0]}>
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
