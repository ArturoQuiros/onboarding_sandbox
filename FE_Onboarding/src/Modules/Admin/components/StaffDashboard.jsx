import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FaSync, FaUsers, FaArrowLeft } from "react-icons/fa";
import styles from "./StaffDashboard.module.css";
import { StaffTable } from "./StaffTable";
import { SearchBar, ItemsPerPageSelector, Spinner } from "./";
import { useInternalUsersQuery } from "../hooks";

/**
 * Dashboard para gestionar el personal interno
 * Permite visualizar, buscar, ordenar y gestionar roles y estados de usuarios
 */
export const StaffDashboard = ({ fields }) => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();

  // ============================================
  // 📊 QUERIES - Obtención de datos
  // ============================================

  const {
    internalUsersQuery,
    rolesQuery,
    updateInternalUserRole,
    toggleInternalUserStatus,
  } = useInternalUsersQuery();

  const { data: staff = [], isLoading, isError, refetch } = internalUsersQuery;
  const { data: roles = [], isFetching: isLoadingRoles } = rolesQuery;

  // ============================================
  // 🎛️ ESTADOS - Búsqueda, paginación, ordenamiento
  // ============================================

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // ============================================
  // 🧮 COMPUTED VALUES
  // ============================================

  // Personal ordenado
  const sortedStaff = useMemo(() => {
    if (!sortKey) return staff;
    return [...staff].sort((a, b) => {
      const aValue = String(a[sortKey] ?? "").toLowerCase();
      const bValue = String(b[sortKey] ?? "").toLowerCase();
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [staff, sortKey, sortDirection]);

  // Personal filtrado por búsqueda
  const filteredStaff = useMemo(() => {
    if (!searchTerm) return sortedStaff;
    return sortedStaff.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.roleName &&
          user.roleName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [sortedStaff, searchTerm]);

  // Personal paginado
  const paginatedStaff = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStaff.slice(start, start + itemsPerPage);
  }, [filteredStaff, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  // ============================================
  // 🎬 HANDLERS - Eventos del usuario
  // ============================================

  /**
   * Cambia el ordenamiento de la tabla
   */
  const handleSort = (key) => {
    setSortKey(key);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  /**
   * Habilita o deshabilita un usuario
   */
  const handleToggleEnabled = (userId, currentStatus) => {
    const newStatus = !currentStatus;
    const actionKey = newStatus ? "enable" : "disable";

    toast.promise(toggleInternalUserStatus.mutateAsync({ userId, newStatus }), {
      loading: t(`staffDashboard.${actionKey}ing`),
      success: t(`staffDashboard.${actionKey}Success`),
      error: t("common.genericError"),
    });
  };

  /**
   * Asigna un nuevo rol a un usuario
   */
  const handleAssignRole = (userId, newRoleId) => {
    toast.promise(updateInternalUserRole.mutateAsync({ userId, newRoleId }), {
      loading: t("staffDashboard.roleUpdating"),
      success: t("staffDashboard.roleUpdateSuccess"),
      error: t("common.genericError"),
    });
  };

  /**
   * Cambia la cantidad de items por página
   */
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  /**
   * Navega hacia atrás
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  // ============================================
  // 🚦 ESTADOS DE CARGA Y ERROR
  // ============================================

  if (isLoading || isLoadingRoles) {
    return (
      <div className={styles.container}>
        <Spinner size="large" message={t("common.loading")} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <p>{t("common.genericError")}</p>
          <button onClick={() => refetch()} className={styles.retryButton}>
            <FaSync /> {t("common.retry")}
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // 🎨 RENDER
  // ============================================

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumb}>
        <button
          className={styles.breadcrumbButton}
          onClick={handleGoBack}
          aria-label={t("common.goBack")}
        >
          <FaArrowLeft />
          <span>{t("common.back")}</span>
        </button>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>
          {t("staffDashboard.title")}
        </span>
      </nav>

      {/* Header con título */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          <FaUsers className={styles.icon} />
          {t("staffDashboard.title")}
        </h2>
      </div>

      {/* Controles de búsqueda y paginación */}
      <div className={styles.controlsBar}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ItemsPerPageSelector
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {/* Tabla de personal */}
      <StaffTable
        fields={fields}
        staff={paginatedStaff}
        roles={roles}
        onToggleEnabled={handleToggleEnabled}
        onAssignRole={handleAssignRole}
        currentPage={currentPage}
        totalPages={totalPages}
        filteredCount={filteredStaff.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
      />
    </div>
  );
};
