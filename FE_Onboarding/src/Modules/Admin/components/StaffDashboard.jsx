// src/Modules/Admin/components/StaffDashboard.jsx

import React, { useState, useMemo } from "react";
import styles from "./StaffDashboard.module.css";
import { StaffTable } from "./StaffTable";
import { SearchBar, ItemsPerPageSelector } from "./";
import { FaPlus, FaSync, FaUsers } from "react-icons/fa";
import { useInternalUsersQuery } from "../hooks";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export const StaffDashboard = ({ fields }) => {
  const { t } = useTranslation("global");

  const {
    internalUsersQuery,
    rolesQuery,
    updateInternalUserRole,
    toggleInternalUserStatus,
  } = useInternalUsersQuery();

  const { data: staff = [], isLoading, isError, refetch } = internalUsersQuery;
  const { data: roles = [], isFetching: isLoadingRoles } = rolesQuery;

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 🆕 Estados de ordenación
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc"); // 🆕 Función para manejar la ordenación (copiada de CrudDashboard)

  const handleSort = (key) => {
    setSortKey(key);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  }; // Función para toggler el estado (habilitar/deshabilitar)

  const handleToggleEnabled = (userId, currentStatus) => {
    const newStatus = !currentStatus;
    const actionKey = newStatus ? "enable" : "disable";

    toast.promise(toggleInternalUserStatus.mutateAsync({ userId, newStatus }), {
      loading: t(`staffDashboard.${actionKey}ing`),
      success: t(`staffDashboard.${actionKey}Success`),
      error: t("common.genericError"),
    });
  }; // Función para asignar un nuevo rol

  const handleAssignRole = (userId, newRoleId) => {
    toast.promise(updateInternalUserRole.mutateAsync({ userId, newRoleId }), {
      loading: t("staffDashboard.roleUpdating"),
      success: t("staffDashboard.roleUpdateSuccess"),
      error: t("common.genericError"),
    });
  }; // 🆕 1. Lógica de Ordenación

  const sortedStaff = useMemo(() => {
    if (!sortKey) return staff;
    return [...staff].sort((a, b) => {
      const aValue = String(a[sortKey] ?? "").toLowerCase();
      const bValue = String(b[sortKey] ?? "").toLowerCase();
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [staff, sortKey, sortDirection]); // 2. Lógica de Filtrado (Ahora usa sortedStaff)

  const filteredStaff = useMemo(() => {
    if (!searchTerm) return sortedStaff;
    // Usar la lógica de filtrado existente, pero sobre el array ordenado
    return sortedStaff.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.roleName &&
          user.roleName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [sortedStaff, searchTerm]); // Cambiado 'staff' por 'sortedStaff' // 3. Lógica de Paginación

  const paginatedStaff = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStaff.slice(start, start + itemsPerPage);
  }, [filteredStaff, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage); // Renderizado condicional

  if (isLoading || isLoadingRoles)
    return <p className={styles.loadingMessage}>{t("common.loading")}</p>;

  if (isError)
    return (
      <div className={styles.errorMessage}>
        <p>{t("common.genericError")}</p>
        <button onClick={() => refetch()} className={styles.retryButton}>
          <FaSync /> {t("common.retry")}
        </button>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <FaUsers className={styles.icon} />
          {t("staffDashboard.title")}
        </h2>
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
        fields={fields}
        staff={paginatedStaff}
        roles={roles}
        onToggleEnabled={handleToggleEnabled}
        onAssignRole={handleAssignRole} // 📤 Props de Paginación
        currentPage={currentPage}
        totalPages={totalPages}
        filteredCount={filteredStaff.length} // Necesario para el footer
        itemsPerPage={itemsPerPage} // Necesario para el footer
        onPageChange={setCurrentPage}
        // 📤 Props de Ordenación
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
      />
    </div>
  );
};
