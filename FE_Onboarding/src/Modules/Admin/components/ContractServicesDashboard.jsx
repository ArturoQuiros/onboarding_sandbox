import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../Api/axiosClient";
import toast from "react-hot-toast";
import { FaLayerGroup } from "react-icons/fa";
import { ContractServicesTable } from "./ContractServicesTable";
import styles from "./ContractServicesDashboard.module.css";

export const ContractServiceDashboard = () => {
  // 1. Obtenemos el ID del contrato de la URL
  const { id: contractId } = useParams();

  // Estados de datos y control
  const [allServices, setAllServices] = useState([]); // Lista completa de servicios
  // Map: serviceId -> relationshipId (Necesario para el DELETE)
  const [assignedServiceIds, setAssignedServiceIds] = useState(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // --- FUNCIÓN DE CARGA DE DATOS ---

  const getAllAvailableServices = async () => {
    try {
      // RUTA quemada: /Servicio
      const response = await axiosClient.get("/Servicio");
      return response.data;
    } catch (error) {
      console.error("Error al obtener todos los servicios disponibles:", error);
      return [];
    }
  };

  const getAssignedServiceRelationships = async () => {
    if (!contractId) return [];
    try {
      // RUTA quemada: /ContratoServicio/ByContrato
      const response = await axiosClient.get(
        `/ContratoServicio/ByContrato?idContrato=${contractId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener relaciones de servicio:", error);
      return [];
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    const [availableServices, assignedRelations] = await Promise.all([
      getAllAvailableServices(),
      getAssignedServiceRelationships(),
    ]);

    setAllServices(availableServices);

    // Mapeamos [ID_Servicio] -> [ID_Relación] para permitir el borrado eficiente
    const assignedMap = new Map();
    assignedRelations.forEach((rel) => {
      assignedMap.set(rel.id_Servicio, rel.id);
    });

    setAssignedServiceIds(assignedMap);
    setIsLoading(false);
    toast.success(
      `Datos cargados: ${availableServices.length} servicios disponibles.`
    );
  };

  // --- FUNCIÓN DE TOGGLE ---

  /**
   * Alterna (asigna/desasigna) un servicio del contrato.
   */
  const handleServiceToggle = async (serviceId, isChecked) => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      if (isChecked) {
        // ASIGNAR (POST)
        const payload = {
          id_Contrato: parseInt(contractId),
          id_Servicio: serviceId,
        };
        // RUTA quemada: POST /ContratoServicio
        await axiosClient.post("/ContratoServicio", payload);
        toast.success(`Servicio asignado.`);
      } else {
        // DESASIGNAR (DELETE)
        const relationshipId = assignedServiceIds.get(serviceId);
        if (relationshipId) {
          // RUTA quemada: DELETE /ContratoServicio/{id} (Usando el ID de la relación)
          await axiosClient.delete(`/ContratoServicio/${relationshipId}`);
          toast.success(`Servicio desasignado.`);
        }
      }

      // Recargamos los datos para actualizar el estado de la tabla y obtener el nuevo ID de relación
      await loadData();
    } catch (error) {
      console.error("Error al modificar el servicio:", error);
      toast.error("Error al guardar los cambios.");
    } finally {
      setIsSaving(false);
    }
  };

  // Carga inicial al montar el componente o cambiar el ID del contrato
  useEffect(() => {
    loadData();
  }, [contractId]);

  // --- RENDERIZADO ---
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <FaLayerGroup className={styles.icon} />
          Servicios del Contrato ID: {contractId}
        </h2>
      </div>

      <p className={styles.description}>
        Marque la casilla para asignar un servicio o desmarque para desasignarlo
        del contrato.
      </p>

      {isLoading ? (
        <p className={styles.loadingMessage}>Cargando servicios...</p>
      ) : (
        // Pasa los datos y el handler a la tabla de presentación
        <ContractServicesTable
          services={allServices}
          assignedServiceIds={assignedServiceIds}
          isSaving={isSaving}
          onToggle={handleServiceToggle}
        />
      )}

      {isSaving && <p className={styles.savingMessage}>Guardando cambios...</p>}
    </div>
  );
};
