// src/Modules/Admin/components/StaffDashboard.jsx

import React, { useState, useMemo } from "react";
import styles from "./StaffDashboard.module.css";
import { StaffTable } from "./StaffTable";
import { SearchBar, ItemsPerPageSelector } from "./";
import { FaPlus, FaSync, FaUsers } from "react-icons/fa";
import { useInternalUsersQuery } from "../hooks";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

// ⚠️ El componente ahora espera recibir la prop 'fields'
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
  const [itemsPerPage, setItemsPerPage] = useState(5); // 🔹 Función para toggler el estado (habilitar/deshabilitar)

  const handleToggleEnabled = (userId, currentStatus) => {
    const newStatus = !currentStatus;
    const actionKey = newStatus ? "enable" : "disable";

    toast.promise(toggleInternalUserStatus.mutateAsync({ userId, newStatus }), {
      loading: t(`staffDashboard.${actionKey}ing`),
      success: t(`staffDashboard.${actionKey}Success`),
      error: t("common.genericError"),
    });
  }; // 🔹 Función para asignar un nuevo rol

  const handleAssignRole = (userId, newRoleId) => {
    toast.promise(updateInternalUserRole.mutateAsync({ userId, newRoleId }), {
      loading: t("staffDashboard.roleUpdating"),
      success: t("staffDashboard.roleUpdateSuccess"),
      error: t("common.genericError"),
    });
  }; // 🔹 Lógica de filtrado y paginación (sin cambios)

  const filteredStaff = useMemo(() => {
    if (!searchTerm) return staff;
    return staff.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.roleName &&
          user.roleName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [staff, searchTerm]);

  const paginatedStaff = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStaff.slice(start, start + itemsPerPage);
  }, [filteredStaff, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage); // 🔹 Renderizado condicional para estados de carga y error (usa common)

  if (isLoading || isLoadingRoles)
    return <p className={styles.loadingMessage}>{t("common.loading")}</p>;

  if (isError)
    return (
      <div className={styles.errorMessage}>
        <p>{t("common.genericError")}</p>
        <button onClick={() => refetch()} className={styles.retryButton}>
          <FaSync /> {t("common.loading")}
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

        <button
          className={styles.createButton}
          onClick={() => console.log("Crear usuario")}
        >
          <FaPlus /> {t("staffDashboard.createButton")}
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

      <StaffTable // ⚠️ Prop 'fields' añadida aquí
        fields={fields}
        staff={paginatedStaff}
        roles={roles}
        onToggleEnabled={handleToggleEnabled}
        onAssignRole={handleAssignRole}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
