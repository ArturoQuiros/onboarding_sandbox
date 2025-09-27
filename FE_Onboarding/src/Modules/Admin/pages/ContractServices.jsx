import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { UIContext } from "../../../Global/Context";
import { BsLayers } from "react-icons/bs";
import axiosClient from "../../../Api/axiosClient";
import toast from "react-hot-toast";

export const ContractServices = () => {
  const { id: contractId } = useParams();
  const { setEntityIcon } = useContext(UIContext);

  // Estados
  const [allServices, setAllServices] = useState([]); // Lista completa de servicios
  const [assignedServiceIds, setAssignedServiceIds] = useState(new Map()); // Map: serviceId -> relationshipId
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEntityIcon(<BsLayers />);
  }, [setEntityIcon]);

  // --- FUNCIONES DE API ---

  /**
   * 1. Obtiene la lista completa de todos los servicios disponibles.
   */
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

  /**
   * 2. Obtiene los IDs de las relaciones (serviceId + relationshipId) asignadas al contrato actual.
   */
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

  /**
   * Carga todos los datos al inicio (servicios y relaciones).
   */
  const loadData = async () => {
    setIsLoading(true);
    const [availableServices, assignedRelations] = await Promise.all([
      getAllAvailableServices(),
      getAssignedServiceRelationships(),
    ]);

    setAllServices(availableServices);

    // Creamos un Map para almacenar [ID_Servicio] -> [ID_Relación] para el DELETE rápido
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

  /**
   * Alterna (asigna/desasigna) un servicio del contrato.
   * @param {number} serviceId - El ID del servicio a modificar.
   * @param {boolean} isChecked - Si la casilla está marcada (TRUE = Asignar, FALSE = Desasignar).
   */
  const handleServiceToggle = async (serviceId, isChecked) => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      if (isChecked) {
        // --- ASIGNAR (POST) ---
        const payload = {
          id_Contrato: parseInt(contractId),
          id_Servicio: serviceId,
        };
        // RUTA quemada: POST /ContratoServicio
        await axiosClient.post("/ContratoServicio", payload);
        toast.success(`Servicio asignado.`);
      } else {
        // --- DESASIGNAR (DELETE) ---
        const relationshipId = assignedServiceIds.get(serviceId);
        if (relationshipId) {
          // RUTA quemada: DELETE /ContratoServicio/{id}
          await axiosClient.delete(`/ContratoServicio/${relationshipId}`);
          toast.success(`Servicio desasignado.`);
        }
      }

      // Recargamos los datos para obtener el nuevo relationshipId (si fue un POST)
      // o para verificar que la eliminación fue exitosa.
      await loadData();
    } catch (error) {
      console.error("Error al modificar el servicio:", error);
      toast.error("Error al guardar los cambios.");
    } finally {
      setIsSaving(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    loadData();
  }, [contractId]);

  // --- RENDERIZADO DEL COMPONENTE ---
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg m-4 md:m-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Servicios del Contrato ID: **{contractId}**
      </h1>
      <h2>
        ACTUALMENTE TRAE LOS SERVICIOS DE TODOS LOS PAIES, FALTA DELIMITAR EL
        API
      </h2>
      <p className="text-gray-600 mb-6">
        Marque la casilla para asignar un servicio o desmarque para desasignarlo
        del contrato actual.
      </p>

      {isLoading ? (
        <p className="text-blue-500">Cargando servicios y relaciones...</p>
      ) : (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            Lista de Servicios Disponibles ({allServices.length})
          </h2>

          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Servicio
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allServices.map((service) => (
                  <tr key={service.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {service.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {service.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        // Se marca si el service.id existe como clave en el Map de asignados
                        checked={assignedServiceIds.has(service.id)}
                        disabled={isSaving}
                        onChange={(e) =>
                          handleServiceToggle(service.id, e.target.checked)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isSaving && (
        <p className="text-indigo-600 mt-4 font-semibold">
          Guardando cambios...
        </p>
      )}

      <div className="p-4 border-t pt-6">
        <h2 className="text-xl font-semibold mb-3">Información Adicional</h2>
        <p className="text-gray-500">
          La página ya está funcional. Cada vez que se marca o desmarca un
          servicio, se realiza una llamada POST o DELETE al API, seguida de una
          recarga de los datos para actualizar el estado.
        </p>
      </div>
    </div>
  );
};
