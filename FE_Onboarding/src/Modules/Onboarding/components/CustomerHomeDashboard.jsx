import React, { useMemo, useState } from "react";
import { TaskStatsCards } from "./TaskStatsCards";
import { TaskCharts } from "./TaskCharts";
import { TaskTable } from "./TaskTable";
import { ItemsPerPageSelector } from "./ItemsPerPageSelector";
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
  // ✅ Inicialización como Número
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Asegura que totalPages se calcule correctamente con el número de itemsPerPage
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  // ✅ Lógica de paginación para obtener solo las tareas de la página actual
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, currentPage, itemsPerPage]);

  return (
    <div className={styles.dashboardContainer}>
      {/* <TaskStatsCards totals={totals} /> */}

      {/* GRAFICOS */}
      <TaskCharts tasks={filteredTasks} />

      {/* FILTROS: tabs + búsqueda + selector de registros */}
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
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.rightControls}>
          <input
            className={styles.searchInput}
            placeholder="Buscar tarea..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          {/* ✅ ItemsPerPageSelector corregido en su archivo para pasar Number */}
          <ItemsPerPageSelector
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(value) => {
              // 'value' ya es un número gracias al cambio en ItemsPerPageSelector
              setItemsPerPage(value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* TABLA: Recibe solo las tareas paginadas */}
      <TaskTable
        tasks={paginatedTasks}
        staffOptions={staffOptions}
        handleAssignChange={handleAssignChange}
        contractId={contractId}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        // Se puede añadir el total de registros filtrados para la visualización del footer
        filteredCount={filteredTasks.length}
      />
    </div>
  );
};
