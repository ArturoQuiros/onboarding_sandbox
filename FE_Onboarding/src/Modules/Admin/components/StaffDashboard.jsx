import React, { useState, useEffect, useMemo } from "react";
import styles from "./StaffDashboard.module.css";
import { StaffTable } from "./StaffTable";
import { SearchBar, ItemsPerPageSelector } from "./"; // asumiendo que los tienes
import { FaPlus, FaUsers } from "react-icons/fa";

export const StaffDashboard = () => {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    // Datos hardcodeados para pruebas
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

  // Filtrado y paginado
  const filteredStaff = useMemo(() => {
    if (!searchTerm) return staff;
    return staff.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [staff, searchTerm]);

  const paginatedStaff = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStaff.slice(start, start + itemsPerPage);
  }, [filteredStaff, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <FaUsers className={styles.icon} />
          Gestión de Staff
        </h2>
        <button className={styles.createButton}>
          <FaPlus /> Agregar Staff
        </button>
      </div>

      <div className={styles.controlsBar}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ItemsPerPageSelector
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        />
      </div>

      <StaffTable
        staff={paginatedStaff}
        onToggleEnabled={toggleEnabled}
        onAssignRole={assignRole}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
