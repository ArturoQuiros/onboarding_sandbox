import React, { useState } from "react";
import { ChecklistServiceAccordion } from "./ChecklistServiceAccordion";
import { useContractFlow } from "../../../Global/Context";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TaskChecklist.module.css";

export const TaskChecklist = () => {
  const { services, activeService, handleSelectService, role } =
    useContractFlow();
  const navigate = useNavigate();
  const { contractId } = useParams();

  const [openServiceId, setOpenServiceId] = useState(
    activeService?.serviceId || null
  );

  const handleToggle = (serviceId) => {
    if (openServiceId === serviceId) {
      setOpenServiceId(null);
    } else {
      setOpenServiceId(serviceId);
      handleSelectService(serviceId);
    }
  };

  const handleGoHome = () => {
    const basePath = role === "staff" ? "/staff" : "/client";
    navigate(`${basePath}/contract/${contractId}`);
  };

  const handleGoContractMaintenance = () => {
    if (role !== "client") return; // Solo clientes
    navigate(`/client/contract/${contractId}/maintenance`);
  };

  return (
    <div className={styles.checklistContainer}>
      {/* Botones generales */}
      <div className={styles.buttonsContainer}>
        <button className={styles.homeButton} onClick={handleGoHome}>
          Home
        </button>

        {/* Solo mostrar para clientes */}
        {role === "client" && (
          <button
            className={styles.contractButton}
            onClick={handleGoContractMaintenance}
          >
            Your Contract
          </button>
        )}
      </div>

      {/* Acordeones de servicios */}
      {services.map((service) => (
        <ChecklistServiceAccordion
          key={service.serviceId}
          service={service}
          isOpen={openServiceId === service.serviceId}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
