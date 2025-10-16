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
// 🆕 Importamos el hook de países directamente (más simple que pasar por Contracts)
import { useCountriesQuery } from "../hooks/useCountriesQuery";

export const ContractServiceDashboard = () => {
  const { contractId } = useParams();
  const { entityIcon } = useContext(UIContext);
  const { t } = useTranslation("global");

  console.log("[Dashboard] contractId:", contractId);

  // 1. Obtener datos de servicios y el ID del País
  const {
    contractDetailQuery,
    availableServicesQuery,
    assignedRelationsQuery,
    toggleAssignmentMutation,
    idPais,
  } = useContractServicesQuery(contractId);

  // 2. Obtener el mapa de países para mostrar el nombre
  const { countriesQuery, countryMap } = useCountriesQuery();

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

  // 3. Obtener el nombre del País usando el mapa
  const countryName = useMemo(() => {
    // Si el mapa o el idPais no están listos, muestra el ID o un placeholder
    if (!countryMap || !idPais) {
      return `ID: ${idPais}`;
    }
    // Retorna el nombre del país usando el mapa
    return countryMap[idPais] || `ID: ${idPais} (Desconocido)`;
  }, [countryMap, idPais]); // 🆕 Depende de countryMap y idPais

  // Ordenamiento, Filtrado y Paginación (Sin cambios)
  // ... (Toda la lógica de useMemo para sortedItems, filteredItems, paginatedItems) ...
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

  const filteredItems = useMemo(() => {
    if (!searchTerm) return sortedItems;
    return sortedItems.filter(
      (item) =>
        String(item.id).includes(searchTerm) ||
        String(item.nombre).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedItems, searchTerm]);

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

  // 4. Renderizado condicional de carga y error (Incluir la carga de países)
  const isLoading =
    contractDetailQuery.isLoading ||
    availableServicesQuery.isLoading ||
    assignedRelationsQuery.isLoading ||
    countriesQuery.isLoading; // 🆕 Incluir la carga de países

  const isError =
    contractDetailQuery.isError ||
    availableServicesQuery.isError ||
    assignedRelationsQuery.isError ||
    countriesQuery.isError; // 🆕 Incluir el error de países

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
    else if (countriesQuery.isError)
      // 🆕 Manejar el error de países
      errorMessage = t("common.errorLoadingData") + " (Países)";

    return <p className={styles.loadingMessage}>❌ {errorMessage}</p>;
  }

  // Si está cargando o falta el ID del País, mostramos el mensaje de carga
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
              (ID: {contractId} | País: {countryName}){" "}
              {/* 🆕 Usamos countryName */}
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
