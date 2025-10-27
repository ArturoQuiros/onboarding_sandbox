import React from "react";
import { ChecklistItem } from "./ChecklistItem";
import { useContractFlow } from "../../../Global/Context";
import styles from "./TaskChecklist.module.css";
import { useNavigate, useParams } from "react-router-dom";

/**
 * Componente Acordeón para un Servicio.
 */
export const ChecklistServiceAccordion = ({ service, isOpen, onToggle }) => {
  const { activeTask, activeService, setActiveService, setActiveTask, role } =
    useContractFlow();
  const navigate = useNavigate();
  const { contractId } = useParams();

  const headerClass = isOpen
    ? styles.accordionHeaderActive
    : styles.accordionHeader;
  const arrowClass = isOpen ? styles.arrowUp : styles.arrowDown;

  const handleTaskClick = (task) => {
    // Solo actualizar contexto si cambia el servicio o la tarea
    if (activeService?.serviceId !== service.serviceId) {
      setActiveService(service);
    }
    if (activeTask?.taskId !== task.taskId) {
      setActiveTask(task);
    }

    // Navegar a la ruta correspondiente
    const basePath = role === "staff" ? "/staff" : "/client";
    navigate(
      `${basePath}/contract/${contractId}/service/${service.serviceId}/task/${task.taskId}`
    );
  };

  // 🏠 Función para manejar la navegación a Home
  const handleGoHome = () => {
    const basePath = role === "staff" ? "/staff" : "/client";
    navigate(`${basePath}/contract/${contractId}`); // Navega a la vista principal del contrato
  };

  const handleGoContracMaintenance = () => {
    const basePath = "/client"; // Solo existe para Clientes, el Staff ya tiene su pantalla para esto. Aunque podria habilitarselas
    navigate(`${basePath}/contract/${contractId}/maintenance`); // Navega a la vista principal del contrato
  };

  return (
    <div className={styles.accordion}>
      {/* 🏠 Botón de Home agregado y estilizado */}
      <button className={styles.homeButton} onClick={handleGoHome}>
        <span>Home</span>
      </button>

      <button
        className={styles.contractButton}
        onClick={handleGoContracMaintenance}
      >
        <span>Your Contract</span>
      </button>

      <button
        className={headerClass}
        onClick={() => onToggle(service.serviceId)}
      >
        <span>{service.title}</span>
        <span className={arrowClass}>&#9650;</span>
      </button>

      {isOpen && (
        <div className={styles.accordionContent}>
          {service.tasks.map((task) => (
            <ChecklistItem
              key={task.taskId}
              task={task}
              isActive={activeTask?.taskId === task.taskId}
              onClick={() => handleTaskClick(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
