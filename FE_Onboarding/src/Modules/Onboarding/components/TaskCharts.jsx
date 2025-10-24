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

// 🎨 Updated BDO color palette based on statuses
const BDO_STATUS_COLORS = {
  Returned: "#e81a3b", // Critical Red
  Pending: "#d67900", // Gold (pending)
  "Pending Review": "#008fd2", // Blue (review)
  Accepted: "#009966", // Green (success)
};

// 🎨 Updated assignee colors (for BarChart)
const COLORS_ASSIGNEE = [
  "#008fd2",
  "#e81a3b",
  "#d67900",
  "#009966",
  "#5b6e7f",
  "#9ca3af",
];

export const TaskCharts = ({ tasks }) => {
  const { t } = useTranslation("global"); // 👈 Use your preferred namespace (e.g. "dashboard") // 📊 Data for Pie Chart (By Status)

  const chartByStatus = useMemo(() => {
    const map = tasks.reduce((acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {}); // Use English status keys that match the object keys in the map

    const order = ["Returned", "Pending", "Pending Review", "Accepted"];

    return order.map((k) => ({
      name: t(`statuses.${k.replace(/\s/g, "_").toLowerCase()}`), // 👈 Dynamic translation key (e.g., statuses.pending_review)
      value: map[k] || 0,
    }));
  }, [tasks, t]); // 📊 Data for Bar Chart (By Assignee)

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
    BDO_STATUS_COLORS["Returned"],
    BDO_STATUS_COLORS["Pending"],
    BDO_STATUS_COLORS["Pending Review"],
    BDO_STATUS_COLORS["Accepted"],
  ]; // Helper function to render the task count inside the pie slices

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
      {/* 🟢 Chart 1: Donut by Status */}
      <div className={styles.chartBox}>
        <div className={styles.chartTitle}>{t("charts.by_status")}</div>

        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartByStatus}
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
              {chartByStatus.map((entry, idx) => (
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
      {/* 🟣 Chart 2: Bar by Assignee */}
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
