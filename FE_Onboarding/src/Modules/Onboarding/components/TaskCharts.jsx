import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend, // Se mantiene el import, pero se controla su uso
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import styles from "./TaskCharts.module.css";

// 🎨 Nueva paleta de colores BDO según los estados
const BDO_COLORS = {
  // Rojo: Devuelta (Más crítico)
  Devuelta: "#e81a3b",
  // Oro: Pendiente (Necesita atención)
  Pendiente: "#d67900",
  // Ocean: Pendiente de revisión (En proceso/Revisión)
  "Pendiente de revisión": "#008fd2",
  // Jade: Aceptada (Completada/Éxito)
  Aceptada: "#009966",
};

// 🎨 Colores de encargado actualizados (para BarChart)
const COLORS_ASSIGNEE = [
  "#008fd2", // Ocean
  "#e81a3b", // Red
  "#d67900", // Gold
  "#009966", // Jade
  "#5b6e7f",
  "#9ca3af",
];

export const TaskCharts = ({ tasks }) => {
  const chartByState = useMemo(() => {
    const map = tasks.reduce((acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {});
    // ✅ Ordenamos los estados para mapear los colores consistentemente
    const order = [
      "Devuelta",
      "Pendiente",
      "Pendiente de revisión",
      "Aceptada",
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

  // Se corrige la asignación de colores para que use BDO_COLORS basado en el orden
  const COLORS_STATE_ARRAY = [
    BDO_COLORS["Devuelta"],
    BDO_COLORS["Pendiente"],
    BDO_COLORS["Pendiente de revisión"],
    BDO_COLORS["Aceptada"],
  ];

  // Función para mostrar valor dentro del gráfico de pastel/donut
  const renderLabelInside = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }) => {
    if (value === 0) return null; // No mostrar etiqueta para valor cero

    const RADIAN = Math.PI / 180;
    // Se calcula el radio para centrar el valor en el Donut (entre inner y outer)
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
      {/* 🎯 Gráfico 1: Donut (Circular con centro vacío) con Colores BDO */}
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
              outerRadius={90}
              innerRadius={50} // DONUT
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
            {/* ✅ CORRECCIÓN: Leyenda Vertical a la Izquierda */}
            <Legend verticalAlign="middle" align="left" layout="vertical" />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* 🛑 Gráfico 2: Barras por encargado (Leyenda Eliminada) */}
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
            {/* 🛑 Leyenda ELIMINADA (quitando el componente <Legend />) */}
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
