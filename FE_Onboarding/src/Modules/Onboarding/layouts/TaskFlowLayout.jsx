import React from "react";
import { Outlet } from "react-router-dom";
import { TaskChecklist, Navbar } from "../components";
import { ContractFlowProvider } from "../../../Global/Context";
import styles from "./TaskFlowLayout.module.css";

const TaskFlowLayout = () => {
  return (
    <ContractFlowProvider>
      <div className={styles.pageLayout}>
        <Navbar />

        {/* Sidebar con el checklist de tareas */}
        <aside className={styles.checklist}>
          <TaskChecklist />
        </aside>

        {/* Área principal para los formularios o vistas */}
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </ContractFlowProvider>
  );
};

export default TaskFlowLayout;
