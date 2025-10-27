import React, { useState, useMemo, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FaTools } from "react-icons/fa";
import {
  ContractServicesTable,
  SearchBar,
  ItemsPerPageSelector,
} from "../../Admin/components";
import styles from "./ContractServicesDashboard.module.css";
import { UIContext } from "../../../Global/Context";
import {
  useCountriesQuery,
  useContractServicesQuery,
} from "../../../Modules/Admin/hooks";

export const ContractMaintenanceDashboard = () => {
  const { contractId } = useParams();
  const { entityIcon } = useContext(UIContext);
  const { t } = useTranslation("global");

  // 🔹 Hooks del Admin
  const {
    contractDetailQuery,
    availableServicesQuery,
    assignedRelationsQuery,
    toggleAssignmentMutation,
    idPais,
  } = useContractServicesQuery(contractId);

  const { countriesQuery, countryMap } = useCountriesQuery();

  const allServices = availableServicesQuery.data ?? [];

  // 🔹 Estado local para reflejar cambios inmediatamente en UI
  const [localAssignedServiceIds, setLocalAssignedServiceIds] = useState(
    new Map(assignedRelationsQuery.data ?? [])
  );

  useEffect(() => {
    // Mantener sincronizado con los datos del query cuando cambian
    setLocalAssignedServiceIds(new Map(assignedRelationsQuery.data ?? []));
  }, [assignedRelationsQuery.data]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const displayIcon = useMemo(() => entityIcon ?? <FaTools />, [entityIcon]);

  const countryName = useMemo(() => {
    if (!countryMap || !idPais) return `ID: ${idPais}`;
    return countryMap[idPais] || `ID: ${idPais} (Desconocido)`;
  }, [countryMap, idPais]);

  // 🔹 Ordenamiento
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

  // 🔹 Filtrado
  const filteredItems = useMemo(() => {
    if (!searchTerm) return sortedItems;
    return sortedItems.filter(
      (item) =>
        String(item.id).includes(searchTerm) ||
        String(item.nombre).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedItems, searchTerm]);

  // 🔹 Paginación
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // 🔹 Toggle con backend + UI inmediata
  const handleMaintenanceAction = (serviceId) => {
    const isAssigned = !localAssignedServiceIds.has(serviceId);

    // 1️⃣ Cambiar estado local inmediatamente
    setLocalAssignedServiceIds((prev) => {
      const newMap = new Map(prev);
      if (isAssigned) {
        newMap.set(serviceId, true);
      } else {
        newMap.delete(serviceId);
      }
      return newMap;
    });

    // 2️⃣ Llamada al API
    toggleAssignmentMutation.mutate(
      { serviceId, isAssigned },
      {
        onSuccess: (result) => {
          const messageKey =
            result.action === "ASSIGNED"
              ? "maintenance.serviceAssigned"
              : "maintenance.serviceUnassigned";
          toast.success(t(messageKey));
        },
        onError: () => {
          toast.error(t("common.errorSavingChanges"));
          // 🔄 Revertir cambio local en caso de error
          setLocalAssignedServiceIds((prev) => {
            const newMap = new Map(prev);
            if (isAssigned) {
              newMap.delete(serviceId);
            } else {
              newMap.set(serviceId, true);
            }
            return newMap;
          });
        },
      }
    );
  };

  const handleSort = (key) => {
    setSortKey(key);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

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

  if (!contractId)
    return <p className={styles.loadingMessage}>⚠️ Contract ID missing</p>;

  if (isError)
    return (
      <p className={styles.loadingMessage}>❌ {t("common.errorLoadingData")}</p>
    );

  if (isLoading)
    return <p className={styles.loadingMessage}>{t("common.loading")}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.icon}>{displayIcon}</span>
          {t("maintenance.title")}
          {contractId && (
            <span className={styles.contractIdLabel}>
              {" "}
              (ID: {contractId} | País: {countryName})
            </span>
          )}
        </h2>
      </div>

      {allServices.length > 0 && (
        <div className={styles.controlsBar}>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <ItemsPerPageSelector
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}

      <ContractServicesTable
        services={paginatedItems}
        assignedServiceIds={localAssignedServiceIds}
        isSaving={toggleAssignmentMutation.isLoading}
        onToggle={handleMaintenanceAction}
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
