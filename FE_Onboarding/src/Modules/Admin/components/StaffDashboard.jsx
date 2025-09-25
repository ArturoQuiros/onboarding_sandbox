import React, { useState, useEffect } from "react";
import styles from "./StaffDashboard.module.css";
import { StaffTable } from "./StaffTable";

export const StaffDashboard = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    // Datos hardcodeados para pruebas, luego se reemplaza con llamada al AD
    setStaff([
      {
        id: 1,
        name: "Juan Pérez",
        position: "Gerente",
        enabled: true,
        role: "Admin",
      },
      {
        id: 2,
        name: "María López",
        position: "Analista",
        enabled: false,
        role: "User",
      },
      {
        id: 3,
        name: "Carlos García",
        position: "Desarrollador",
        enabled: true,
        role: "User",
      },
    ]);
  }, []);

  const toggleEnabled = (id) => {
    setStaff((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, enabled: !user.enabled } : user
      )
    );
  };

  const assignRole = (id, newRole) => {
    setStaff((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gestión de Staff</h2>
      <StaffTable
        staff={staff}
        onToggleEnabled={toggleEnabled}
        onAssignRole={assignRole}
      />
    </div>
  );
};
