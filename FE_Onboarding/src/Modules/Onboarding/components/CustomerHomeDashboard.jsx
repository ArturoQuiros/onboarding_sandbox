import React, { useMemo, useState } from "react";
import { TaskStatsCards } from "./TaskStatsCards";
import { TaskCharts } from "./TaskCharts";
import { TaskTable } from "./TaskTable";
import styles from "./CustomerHomeDashboard.module.css";

export const CustomerHomeDashboard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Revisión de documentos legales",
      status: "Aceptada",
      assignedTo: "María Gómez",
      observation: "",
      serviceId: 1,
    },
    {
      id: 2,
      name: "Configuración inicial del sistema",
      status: "Pendiente de revisión",
      assignedTo: "José Rojas",
      observation: "Falta completar datos de acceso.",
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
    {
      id: 4,
      name: "Carga de anexos técnicos",
      status: "Devuelta",
      assignedTo: "Carlos Méndez",
      observation: "Revisar anexos incompletos",
      serviceId: 3,
    },
    {
      id: 5,
      name: "Aprobación final y firma",
      status: "Pendiente de revisión",
      assignedTo: "María Gómez",
      observation: "En espera de confirmación del cliente.",
      serviceId: 2,
    },
    {
      id: 6,
      name: "Revisión de políticas internas",
      status: "Aceptada",
      assignedTo: "Andrea Vargas",
      observation: "",
      serviceId: 4,
    },
    {
      id: 7,
      name: "Verificación de cuentas bancarias",
      status: "Pendiente",
      assignedTo: "Luis Soto",
      observation: "Documento bancario incompleto.",
      serviceId: 2,
    },
  ]);

  const staffOptions = [
    "",
    "María Gómez",
    "José Rojas",
    "Carlos Méndez",
    "Andrea Vargas",
    "Luis Soto",
  ];
  const contractId = 1;
  const [activeTab, setActiveTab] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAssignChange = (taskId, newValue) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, assignedTo: newValue } : t))
    );
  };

  const totals = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Aceptada").length;
    const inReview = tasks.filter(
      (t) => t.status === "Pendiente de revisión"
    ).length;
    const pending = tasks.filter((t) => t.status === "Pendiente").length;
    const returned = tasks.filter((t) => t.status === "Devuelta").length;
    return { total, completed, inReview, pending, returned };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesTab = activeTab === "Todas" || t.status === activeTab;
      const matchesSearch = t.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [tasks, activeTab, searchTerm]);

  return (
    <div className={styles.dashboardContainer}>
      {/* LINEA SUPERIOR: estadísticas compactas */}
      <TaskStatsCards totals={totals} />

      {/* GRAFICOS */}
      <TaskCharts tasks={filteredTasks} />

      {/* FILTROS: tabs + búsqueda */}
      <div className={styles.controlsRow}>
        <div className={styles.tabs}>
          {[
            "Todas",
            "Pendiente",
            "Pendiente de revisión",
            "Aceptada",
            "Devuelta",
          ].map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${
                activeTab === tab ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className={styles.searchWrap}>
          <input
            className={styles.searchInput}
            placeholder="Buscar tarea..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLA */}
      <TaskTable
        tasks={filteredTasks}
        staffOptions={staffOptions}
        handleAssignChange={handleAssignChange}
        contractId={contractId}
      />
    </div>
  );
};
