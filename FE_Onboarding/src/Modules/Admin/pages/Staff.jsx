import React, { useContext, useEffect, useState } from "react";
import { UIContext } from "../../../Global/Context";
import { BsPeople } from "react-icons/bs";
import { StaffTable } from "../components/StaffTable";

export const Staff = () => {
  const { setEntityIcon, entityIcon } = useContext(UIContext);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    setEntityIcon(<BsPeople />);
    // Datos hardcodeados simulando usuarios de AD
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
  }, [setEntityIcon]);

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
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "20px" }}>
        Gestión de Staff
      </h2>
      <StaffTable
        staff={staff}
        onToggleEnabled={toggleEnabled}
        onAssignRole={assignRole}
      />
    </div>
  );
};
