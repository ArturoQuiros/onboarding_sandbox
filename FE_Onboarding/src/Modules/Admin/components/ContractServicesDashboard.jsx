import React, { useState, useMemo, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FaLayerGroup, FaArrowLeft } from "react-icons/fa";
import { ContractServicesTable } from "./ContractServicesTable";
import styles from "./ContractServicesDashboard.module.css";
import { UIContext } from "../../../Global/Context";
import { SearchBar, ItemsPerPageSelector } from "./";
import { useContractServicesQuery } from "../hooks/useContractServicesQuery";
import { useCountriesQuery } from "../hooks/useCountriesQuery";

/**
 * Dashboard para gestionar los servicios asignados a un contrato específico
 * Permite visualizar, buscar, ordenar y asignar/desasignar servicios
 */
export const ContractServiceDashboard = () => {
  const { contractId } = useParams();
  const { entityIcon } = useContext(UIContext);
  const { t } = useTranslation("global");
  const navigate = useNavigate();

  // ============================================
  // 📊 QUERIES - Obtención de datos
  // ============================================

  // Servicios del contrato y relaciones
  const {
    contractDetailQuery,
    availableServicesQuery,
    assignedRelationsQuery,
    toggleAssignmentMutation,
    idPais,
  } = useContractServicesQuery(contractId);

  // Países para mostrar nombre en lugar de ID
  const { countriesQuery, countryMap } = useCountriesQuery();

  const allServices = availableServicesQuery.data ?? [];
  const assignedServiceIds = assignedRelationsQuery.data ?? new Map();

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

  // Icono por defecto si no hay entityIcon
  const displayIcon = useMemo(
    () => entityIcon ?? <FaLayerGroup />,
    [entityIcon]
  );

  // Nombre del país usando el mapa
  const countryName = useMemo(() => {
    if (!countryMap || !idPais) {
      return idPais ? `ID: ${idPais}` : "";
    }
    return countryMap[idPais] || `ID: ${idPais}`;
  }, [countryMap, idPais]);

  // Servicios ordenados
  const sortedItems = useMemo(() => {
    if (!sortKey) return allServices;
    return [...allServices].sort((a, b) => {
      const aValue = String(a[sortKey] ?? "").toLowerCase();
      const bValue = String(b[sortKey] ?? "").toLowerCase();
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [allServices, sortKey, sortDirection]);

  // Servicios filtrados por búsqueda
  const filteredItems = useMemo(() => {
    if (!searchTerm) return sortedItems;
    return sortedItems.filter(
      (item) =>
        String(item.id).includes(searchTerm) ||
        String(item.nombre).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedItems, searchTerm]);

  // Servicios paginados
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // ============================================
  // 🎬 HANDLERS - Eventos del usuario
  // ============================================

  /**
   * Asigna o desasigna un servicio del contrato
   */
  const handleServiceToggle = (serviceId, isChecked) => {
    toggleAssignmentMutation.mutate(
      { serviceId, isAssigned: isChecked },
      {
        onSuccess: (result) => {
          const messageKey =
            result.action === "ASSIGNED"
              ? "contractServices.serviceAssigned"
              : "contractServices.serviceUnassigned";
          toast.success(t(messageKey));
        },
        onError: (error) => {
          console.error("Error al modificar el servicio:", error);
          toast.error(t("common.errorSavingChanges"));
        },
      }
    );
  };

  /**
   * Cambia el ordenamiento de la tabla
   */
  const handleSort = (key) => {
    setSortKey(key);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  /**
   * Cambia la cantidad de items por página
   */
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
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

  const isLoading =
    contractDetailQuery.isLoading ||
    availableServicesQuery.isLoading ||
    assignedRelationsQuery.isLoading ||
    countriesQuery.isLoading;

  const isError =
    contractDetailQuery.isError ||
    availableServicesQuery.isError ||
    assignedRelationsQuery.isError ||
    countriesQuery.isError;

  // Validación: ID de contrato requerido
  if (!contractId) {
    return (
      <p className={styles.loadingMessage}>
        ⚠️ {t("contractServices.missingContractId")}
      </p>
    );
  }

  // Manejo de errores específicos
  if (isError) {
    let errorMessage = t("common.errorLoadingData");

    if (contractDetailQuery.isError) {
      errorMessage = t("contractServices.errorContractDetails");
    } else if (availableServicesQuery.isError) {
      errorMessage = t("contractServices.errorServicesByCountry");
    } else if (assignedRelationsQuery.isError) {
      errorMessage = t("contractServices.errorAssignedRelations");
    } else if (countriesQuery.isError) {
      errorMessage = t("contractServices.errorCountries");
    }

    return <p className={styles.loadingMessage}>❌ {errorMessage}</p>;
  }

  // Estado de carga
  if (isLoading) {
    return <p className={styles.loadingMessage}>{t("common.loading")}</p>;
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
          {t("contractServices.title")}
        </span>
      </nav>

      {/* Header con título e información del contrato */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.icon}>{displayIcon}</span>
          {t("contractServices.title")}
        </h2>
      </div>

      {/* Controles de búsqueda y paginación */}
      {allServices.length > 0 && (
        <div className={styles.controlsBar}>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <ItemsPerPageSelector
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}

      {/* Tabla de servicios */}
      <ContractServicesTable
        services={paginatedItems}
        assignedServiceIds={assignedServiceIds}
        isSaving={toggleAssignmentMutation.isLoading}
        onToggle={handleServiceToggle}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
        currentPage={currentPage}
        totalPages={totalPages}
        filteredCount={filteredItems.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
