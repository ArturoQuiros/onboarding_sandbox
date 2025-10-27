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
      name: "Legal Document Review",
      status: "Accepted",
      assignedTo: "María Gómez",
      observation: "",
      serviceId: 1,
    },
    {
      id: 2,
      name: "Initial System Setup",
      status: "Pending Review",
      assignedTo: "José Rojas",
      observation: "Missing access credentials.",
      serviceId: 2,
    },
    {
      id: 3,
      name: "Contract Validation",
      status: "Pending",
      assignedTo: "",
      observation: "",
      serviceId: 1,
    },
    {
      id: 4,
      name: "Technical Annex Upload",
      status: "Returned",
      assignedTo: "Carlos Méndez",
      observation: "Review incomplete annexes.",
      serviceId: 3,
    },
    {
      id: 5,
      name: "Final Approval and Signature",
      status: "Pending Review",
      assignedTo: "María Gómez",
      observation: "Awaiting customer confirmation.",
      serviceId: 2,
    },
    {
      id: 6,
      name: "Internal Policy Review",
      status: "Accepted",
      assignedTo: "Andrea Vargas",
      observation: "",
      serviceId: 4,
    },
    {
      id: 7,
      name: "Bank Account Verification",
      status: "Pending",
      assignedTo: "Luis Soto",
      observation: "Incomplete bank document.",
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

  const [activeTab, setActiveTab] = useState("All"); // Migrado "Todas" a "All"
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAssignChange = (taskId, newValue) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, assignedTo: newValue } : t))
    );
  };

  const totals = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Accepted").length; // Actualizado "Aceptada"
    const inReview = tasks.filter(
      (t) => t.status === "Pending Review" // Actualizado "Pendiente de revisión"
    ).length;
    const pending = tasks.filter((t) => t.status === "Pending").length; // Actualizado "Pendiente"
    const returned = tasks.filter((t) => t.status === "Returned").length; // Actualizado "Devuelta"
    return { total, completed, inReview, pending, returned };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesTab = activeTab === "All" || t.status === activeTab;
      const matchesSearch = t.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [tasks, activeTab, searchTerm]);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, currentPage, itemsPerPage]);

  return (
    <div className={styles.dashboardContainer}>
      {/* <TaskStatsCards totals={totals} /> */} {/* CHARTS */}
      <TaskCharts tasks={filteredTasks} />
      {/* FILTERS: tabs + search + records selector */}
      <div className={styles.controlsRow}>
        <div className={styles.tabs}>
          {[
            "All", // Actualizado
            "Pending", // Actualizado
            "Pending Review", // Actualizado
            "Accepted", // Actualizado
            "Returned", // Actualizado
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
            placeholder="Search task..." // Actualizado
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <ItemsPerPageSelector
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      {/* TABLE: Receives only the paginated tasks */}
      <TaskTable
        tasks={paginatedTasks}
        staffOptions={staffOptions}
        handleAssignChange={handleAssignChange}
        contractId={contractId}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        filteredCount={filteredTasks.length}
      />
    </div>
  );
};
