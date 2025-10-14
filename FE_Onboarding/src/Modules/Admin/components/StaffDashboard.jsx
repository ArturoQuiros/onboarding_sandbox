// src/Modules/Admin/components/StaffDashboard.jsx

import React, { useState, useMemo } from "react";
import styles from "./StaffDashboard.module.css";
import { StaffTable } from "./StaffTable";
import { SearchBar, ItemsPerPageSelector } from "./"; // Asegúrate que estos componentes existan
import { FaPlus, FaUsers } from "react-icons/fa";
import { useInternalUsersQuery } from "../hooks"; // 👈 1. Importar el hook

export const StaffDashboard = () => {
  // 🔹 2. Usar el hook para obtener datos y mutaciones
  const {
    internalUsersQuery,
    rolesQuery,
    updateInternalUserRole,
    toggleInternalUserStatus,
  } = useInternalUsersQuery();

  // Extraemos la información de las queries
  const { data: staff = [], isLoading, isError } = internalUsersQuery;
  const { data: roles = [] } = rolesQuery;

  // Estados locales para la UI (búsqueda y paginación)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // 🔹 3. Funciones que llaman a las mutaciones de React Query
  const handleToggleEnabled = (userId, currentStatus) => {
    toggleInternalUserStatus.mutate({ userId, newStatus: !currentStatus });
  };

  const handleAssignRole = (userId, newRoleId) => {
    updateInternalUserRole.mutate({ userId, newRoleId });
  };

  // 🔹 4. Lógica de filtrado y paginación (sin cambios, ahora usa datos de la query)
  const filteredStaff = useMemo(() => {
    if (!searchTerm) return staff;
    return staff.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.roleName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [staff, searchTerm]);

  const paginatedStaff = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStaff.slice(start, start + itemsPerPage);
  }, [filteredStaff, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  // 🔹 5. Renderizado condicional para estados de carga y error
  if (isLoading) return <p>Cargando personal...</p>;
  if (isError) return <p>Error al cargar los datos del personal.</p>;

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

      {/* 🔹 6. Pasar los datos y las nuevas funciones a la tabla */}
      <StaffTable
        staff={paginatedStaff}
        roles={roles} // Pasamos la lista de roles para el selector
        onToggleEnabled={handleToggleEnabled}
        onAssignRole={handleAssignRole}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
