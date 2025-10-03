// src/Modules/Admin/components/ContractServiceDashboard.jsx

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosClient from "../../../Api/axiosClient";
import toast from "react-hot-toast";
import { FaLayerGroup } from "react-icons/fa";
import { ContractServicesTable } from "./ContractServicesTable";
import styles from "./ContractServicesDashboard.module.css";
import { UIContext } from "../../../Global/Context";
import { SearchBar, ItemsPerPageSelector } from "./";

/**
 * @typedef {object} Service
 * @property {number} id - Identificador del servicio.
 * @property {string} nombre - Nombre del servicio.
 */

/**
 * Componente principal para gestionar la asignación de servicios a un contrato específico.
 * Muestra todos los servicios disponibles y permite al usuario marcarlos/desmarcarlos
 * para asignarlos o desasignarlos del contrato.
 * @returns {JSX.Element}
 */
export const ContractServiceDashboard = () => {
  const { id: contractId } = useParams();
  const { entityIcon } = useContext(UIContext);
  const { t } = useTranslation();

  const [allServices, setAllServices] = useState([]);
  const [assignedServiceIds, setAssignedServiceIds] = useState(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // ESTADOS DE CONTROL DE DATOS (CrudDashboard pattern)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // ============================
  // Lógica de Ícono Unificada
  // ============================
  const displayIcon = useMemo(() => {
    // Prioriza el ícono del contexto, usa FaLayerGroup como fallback.
    if (entityIcon) {
      return entityIcon;
    }
    return <FaLayerGroup />;
  }, [entityIcon]);

  // ============================
  // Funciones de Carga de Datos
  // ============================

  /** Obtiene todos los servicios disponibles desde la API. */
  const getAllAvailableServices = useCallback(async () => {
    try {
      const response = await axiosClient.get("/Servicio");
      return response.data;
    } catch (error) {
      console.error("Error al obtener todos los servicios disponibles:", error);
      return [];
    }
  }, []);

  /** Obtiene las relaciones de servicio existentes para el contrato actual. */
  const getAssignedServiceRelationships = useCallback(async () => {
    if (!contractId) return [];
    try {
      const response = await axiosClient.get(
        `/ContratoServicio/ByContrato?idContrato=${contractId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener relaciones de servicio:", error);
      return [];
    }
  }, [contractId]);

  /** Carga todos los servicios y las relaciones de asignación existentes, y actualiza los estados. */
  const loadData = useCallback(async () => {
    setIsLoading(true);
    const [availableServices, assignedRelations] = await Promise.all([
      getAllAvailableServices(),
      getAssignedServiceRelationships(),
    ]);

    setAllServices(availableServices);

    const assignedMap = new Map();
    assignedRelations.forEach((rel) => {
      assignedMap.set(rel.id_Servicio, rel.id);
    });

    setAssignedServiceIds(assignedMap);
    setIsLoading(false);
    setCurrentPage(1);

    // No hay toast en la carga inicial
  }, [getAllAvailableServices, getAssignedServiceRelationships]);

  // ============================
  // Lógica de Control de Datos (Ordenación/Paginación)
  // ============================

  /** Maneja el cambio de clave de ordenación y dirección. */
  const handleSort = (key) => {
    setSortKey(key);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  /** Maneja el cambio en el número de elementos por página. */
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  /** Items ordenados basados en sortKey y sortDirection. */
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

  /** Items filtrados basados en el término de búsqueda. */
  const filteredItems = useMemo(() => {
    if (!searchTerm) return sortedItems;
    return sortedItems.filter(
      (item) =>
        String(item.id).includes(searchTerm) ||
        String(item.nombre).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedItems, searchTerm]);

  /** Items paginados para la tabla actual. */
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // ============================
  // Toggle de Asignación (Actualización Local)
  // ============================

  /** Asigna o desasigna un servicio al contrato. */
  const handleServiceToggle = useCallback(
    async (serviceId, isChecked) => {
      if (isSaving) return;
      setIsSaving(true);

      try {
        const newAssignedServiceIds = new Map(assignedServiceIds); // Copia del mapa

        if (isChecked) {
          // Asignar (POST)
          const payload = {
            id_Contrato: parseInt(contractId),
            id_Servicio: serviceId,
          };
          // El API debería devolver el objeto de relación (ContratoServicio) con su ID.
          const response = await axiosClient.post("/ContratoServicio", payload);

          // Actualizar estado localmente con el ID de la nueva relación
          newAssignedServiceIds.set(serviceId, response.data.id);

          toast.success(t("contractServices.serviceAssigned"));
        } else {
          // Desasignar (DELETE)
          const relationshipId = assignedServiceIds.get(serviceId);
          if (relationshipId) {
            await axiosClient.delete(`/ContratoServicio/${relationshipId}`);

            // Eliminar la relación del mapa local
            newAssignedServiceIds.delete(serviceId);

            toast.success(t("contractServices.serviceUnassigned"));
          }
        }

        // Actualiza el estado sin llamar a loadData()
        setAssignedServiceIds(newAssignedServiceIds);
      } catch (error) {
        console.error("Error al modificar el servicio:", error);
        toast.error(t("common.errorSavingChanges"));
      } finally {
        setIsSaving(false);
      }
    },
    [assignedServiceIds, contractId, isSaving, t]
  );

  // ============================
  // Efectos
  // ============================
  useEffect(() => {
    loadData();
  }, [loadData]);

  // ============================
  // Render
  // ============================
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.icon}>{displayIcon}</span>
          {t("contractServices.title")}
        </h2>
      </div>

      {/* BARRA DE CONTROLES (Solo se muestra cuando no está cargando) */}
      {!isLoading && (
        <div className={styles.controlsBar}>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <ItemsPerPageSelector
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}

      {isLoading ? (
        <p className={styles.loadingMessage}>{t("common.loading")}</p>
      ) : (
        <ContractServicesTable
          services={paginatedItems}
          assignedServiceIds={assignedServiceIds}
          isSaving={isSaving}
          onToggle={handleServiceToggle}
          onSort={handleSort}
          sortKey={sortKey}
          sortDirection={sortDirection}
          // PROPS DE PAGINACIÓN DELEGADAS A LA TABLA
          currentPage={currentPage}
          totalPages={totalPages}
          filteredCount={filteredItems.length}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Mensaje de guardado (Solo se muestra durante el toggle) */}
      {isSaving && (
        <p className={styles.savingMessage}>{t("common.savingChanges")}</p>
      )}
    </div>
  );
};
