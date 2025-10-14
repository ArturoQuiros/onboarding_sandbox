import React, { useState, useMemo, useContext } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FaLayerGroup } from "react-icons/fa";
import { ContractServicesTable } from "./ContractServicesTable";
import styles from "./ContractServicesDashboard.module.css";
import { UIContext } from "../../../Global/Context";
import { SearchBar, ItemsPerPageSelector } from "./";
import { useContractServicesQuery } from "../hooks/useContractServicesQuery";

export const ContractServiceDashboard = () => {
  const { contractId } = useParams();
  const { entityIcon } = useContext(UIContext);
  const { t } = useTranslation("global");

  console.log("[Dashboard] contractId:", contractId);

  const {
    contractDetailQuery,
    availableServicesQuery,
    assignedRelationsQuery,
    toggleAssignmentMutation,
    idPais,
  } = useContractServicesQuery(contractId);

  const allServices = availableServicesQuery.data ?? [];
  const assignedServiceIds = assignedRelationsQuery.data ?? new Map();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const displayIcon = useMemo(
    () => entityIcon ?? <FaLayerGroup />,
    [entityIcon]
  );

  // Ordenamiento
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

  // Filtrado
  const filteredItems = useMemo(() => {
    if (!searchTerm) return sortedItems;
    return sortedItems.filter(
      (item) =>
        String(item.id).includes(searchTerm) ||
        String(item.nombre).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedItems, searchTerm]);

  // Paginación
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Toggle
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
    assignedRelationsQuery.isLoading;

  const isError =
    contractDetailQuery.isError ||
    availableServicesQuery.isError ||
    assignedRelationsQuery.isError;

  if (!contractId)
    return <p className={styles.loadingMessage}>⚠️ Contract ID missing</p>;

  if (isError) {
    let errorMessage = t("common.errorLoadingData");
    if (contractDetailQuery.isError)
      errorMessage = t("contractServices.errorContractDetails");
    else if (availableServicesQuery.isError)
      errorMessage = t("contractServices.errorServicesByCountry");
    else if (assignedRelationsQuery.isError)
      errorMessage = t("contractServices.errorAssignedRelations");
    return <p className={styles.loadingMessage}>❌ {errorMessage}</p>;
  }

  if (isLoading)
    return <p className={styles.loadingMessage}>{t("common.loading")}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.icon}>{displayIcon}</span>
          {t("contractServices.title")}
          {contractId && (
            <span className={styles.contractIdLabel}>
              {" "}
              (ID: {contractId} | País: {idPais})
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
