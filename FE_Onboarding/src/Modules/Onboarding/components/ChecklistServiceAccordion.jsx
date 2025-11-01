import React from "react";
import { ChecklistItem } from "./ChecklistItem";
import { useContractFlow } from "../../../Global/Context";
import styles from "./TaskChecklist.module.css";
import { useNavigate, useParams } from "react-router-dom";

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
    if (activeService?.serviceId !== service.serviceId) {
      setActiveService(service);
    }
    if (activeTask?.taskId !== task.taskId) {
      setActiveTask(task);
    }

    const basePath = role === "staff" ? "/staff" : "/client";
    navigate(
      `${basePath}/contract/${contractId}/service/${service.serviceId}/task/${task.taskId}`
    );
  };

  return (
    <div className={styles.accordion}>
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
