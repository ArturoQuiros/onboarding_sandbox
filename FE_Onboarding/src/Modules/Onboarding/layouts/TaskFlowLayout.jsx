// src/modules/contractFlow/layouts/TaskFlowLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import { TaskChecklist, Navbar } from "../components";
import styles from "./TaskFlowLayout.module.css";

const TaskFlowLayout = () => {
  // Nota: Eliminamos la lógica isSidebarOpen ya que el checklist siempre estará visible
  return (
    <div className={styles.pageLayout}>
      <Navbar />

      {/* TaskChecklist actúa como la Sidebar de tareas */}
      <aside className={styles.checklist}>
        <TaskChecklist />
      </aside>

      {/* Aquí va la vista del formulario (ClientTaskView o StaffTaskReview) */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default TaskFlowLayout;
