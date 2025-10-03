// src/Modules/Admin/components/ContractServiceDashboard.jsx

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../Api/axiosClient";
import toast from "react-hot-toast";
import { FaLayerGroup } from "react-icons/fa"; // Ícono de fallback para servicios
import { ContractServicesTable } from "./ContractServicesTable";
import styles from "./ContractServicesDashboard.module.css";
import { UIContext } from "../../../Global/Context";
// Asume que estos componentes existen en la ruta correcta:
import { SearchBar, ItemsPerPageSelector } from "./";

export const ContractServiceDashboard = () => {
  const { id: contractId } = useParams();
  const { entityIcon } = useContext(UIContext);

  const [allServices, setAllServices] = useState([]);
  const [assignedServiceIds, setAssignedServiceIds] = useState(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // ESTADOS DE CONTROL DE DATOS (CrudDashboard pattern)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // AJUSTE: sortKey inicializado en null para coincidir con CrudDashboard.jsx
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // ============================
  // LÓGICA DE ÍCONO UNIFICADA
  // ============================
  // Priorizar entityIcon (del contexto), usar FaLayerGroup como fallback.
  const displayIcon = useMemo(() => {
    // Si el UIContext proporciona un ícono, úsalo.
    if (entityIcon) {
      return entityIcon;
    }
    // Si no, usa el ícono específico de servicios.
    return <FaLayerGroup />;
  }, [entityIcon]);

  // ============================
  // Funciones de carga de datos
  // (Sin cambios, omitidas por brevedad)
  // ============================
  const getAllAvailableServices = useCallback(async () => {
    // ... lógica de API
    try {
      const response = await axiosClient.get("/Servicio");
      return response.data;
    } catch (error) {
      console.error("Error al obtener todos los servicios disponibles:", error);
      return [];
    }
  }, []);

  const getAssignedServiceRelationships = useCallback(async () => {
    // ... lógica de API
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

    toast.success(
      `Datos cargados: ${availableServices.length} servicios disponibles.`
    );
  }, [getAllAvailableServices, getAssignedServiceRelationships]);

  // ============================
  // LÓGICA DE CONTROL DE DATOS
  // (Sin cambios, excepto el toggle de sortDirection)
  // ============================

  const handleSort = (key) => {
    setSortKey(key);
    // Coincide con CrudDashboard: simple toggle
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // (sortedItems, filteredItems, paginatedItems, totalPages useMemo sin cambios)

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

  // ============================
  // Toggle de asignación (sin cambios)
  // ============================
  const handleServiceToggle = useCallback(
    async (serviceId, isChecked) => {
      if (isSaving) return;
      setIsSaving(true);

      try {
        if (isChecked) {
          const payload = {
            id_Contrato: parseInt(contractId),
            id_Servicio: serviceId,
          };
          await axiosClient.post("/ContratoServicio", payload);
          toast.success(`Servicio asignado.`);
        } else {
          const relationshipId = assignedServiceIds.get(serviceId);
          if (relationshipId) {
            await axiosClient.delete(`/ContratoServicio/${relationshipId}`);
            toast.success(`Servicio desasignado.`);
          }
        }
        await loadData();
      } catch (error) {
        console.error("Error al modificar el servicio:", error);
        toast.error("Error al guardar los cambios.");
      } finally {
        setIsSaving(false);
      }
    },
    [assignedServiceIds, contractId, isSaving, loadData]
  );

  // ============================
  // Efectos (sin cambios)
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
          {/* 📌 ÍCONO RENDERIZADO UNA SOLA VEZ */}
          <span className={styles.icon}>{displayIcon}</span>
          Servicios del Contrato ID: {contractId}
        </h2>
        {/* Aquí estaría el botón de crear del CrudDashboard */}
      </div>

      <p className={styles.description}>
        Marque la casilla para asignar un servicio o desmarque para desasignarlo
        del contrato.
      </p>

      {/* BARRA DE CONTROLES */}
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
        <p className={styles.loadingMessage}>Cargando servicios...</p>
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

      {isSaving && <p className={styles.savingMessage}>Guardando cambios...</p>}
    </div>
  );
};
