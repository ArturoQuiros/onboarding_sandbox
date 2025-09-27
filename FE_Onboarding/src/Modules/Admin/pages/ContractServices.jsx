import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UIContext } from "../../../Global/Context";
import { BsLayers } from "react-icons/bs";
import axiosClient from "../../../Api/axiosClient";
import toast from "react-hot-toast";

// URL base para la tabla de relación ContratoServicio
const BASE_URL = "/WS_Onboarding/ContratoServicio";

export const ContractServices = () => {
  // Obtiene el ID del contrato de la URL (ej: /admin/contracts/123/services)
  const { id: contractId } = useParams();
  const { setEntityIcon } = useContext(UIContext);

  // Estado para la lista de servicios ya asignados al contrato
  const [assignedServices, setAssignedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Establece el ícono de la entidad en la UI global
  useEffect(() => {
    setEntityIcon(<BsLayers />);
  }, [setEntityIcon]);

  // --- FUNCIONES DE API ---

  /**
   * Obtiene la lista de servicios asignados al contrato actual.
   * Utiliza el endpoint /ByContrato.
   */
  const getContractServices = async () => {
    if (!contractId) return;

    try {
      setIsLoading(true);
      // El endpoint ByContrato probablemente requiere el ID como parámetro de búsqueda o en el cuerpo.
      // Asumimos que la API espera el ID como un parámetro de consulta (query parameter)
      const response = await axiosClient.get(
        `${BASE_URL}/ByContrato?idContrato=${contractId}`
      );

      // Mapeamos y guardamos la lista. Necesitamos los datos del servicio
      // y el ID de la relación (id) para poder desasignarlo.
      setAssignedServices(
        response.data.map((item) => ({
          id: item.id, // ID del registro de relación (necesario para el DELETE)
          id_Contrato: item.id_Contrato,
          id_Servicio: item.id_Servicio,
          // (Asumimos que el API puede devolver más detalles del servicio aquí,
          // si no, habría que hacer otra llamada para obtener el nombre del servicio)
          // Por ahora, solo usamos los IDs que nos devuelve el ejemplo.
        }))
      );
    } catch (error) {
      console.error("Error al obtener servicios del contrato:", error);
      toast.error("Error al cargar los servicios.");
      setAssignedServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Asigna un nuevo servicio al contrato.
   * @param {number} serviceId - El ID del servicio a asignar.
   */
  const assignService = async (serviceId) => {
    try {
      const payload = {
        id_Contrato: parseInt(contractId),
        id_Servicio: serviceId,
      };
      const response = await axiosClient.post(BASE_URL, payload);
      toast.success("Servicio asignado correctamente.");
      // Recargar la lista después de la asignación
      getContractServices();
      return response.data;
    } catch (error) {
      console.error("Error al asignar servicio:", error);
      toast.error("Error al asignar el servicio.");
      throw error;
    }
  };

  /**
   * Desasigna un servicio del contrato.
   * @param {number} relationshipId - El ID del registro de relación (item.id) a eliminar.
   */
  const unassignService = async (relationshipId) => {
    try {
      await axiosClient.delete(`${BASE_URL}/${relationshipId}`);
      toast.success("Servicio desasignado correctamente.");
      // Recargar la lista después de la desasignación
      getContractServices();
      return true;
    } catch (error) {
      console.error("Error al desasignar servicio:", error);
      toast.error("Error al desasignar el servicio.");
      throw error;
    }
  };

  // Carga inicial de datos al montar el componente
  useEffect(() => {
    getContractServices();
  }, [contractId]); // Dependencia del ID para recargar si cambia de contrato

  // --- RENDERIZADO DEL COMPONENTE ---
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg m-4 md:m-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Servicios del Contrato ID: {contractId}
      </h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Servicios Asignados</h2>
        {isLoading ? (
          <p className="text-blue-500">Cargando servicios...</p>
        ) : assignedServices.length === 0 ? (
          <p className="text-gray-500">
            No hay servicios asignados a este contrato.
          </p>
        ) : (
          <ul className="border rounded-lg divide-y divide-gray-200">
            {assignedServices.map((service) => (
              <li
                key={service.id}
                className="p-3 flex justify-between items-center"
              >
                <span>
                  Servicio ID: **{service.id_Servicio}** (Relación ID:{" "}
                  {service.id})
                  {/* Aquí deberías mostrar el nombre real del servicio */}
                </span>
                <button
                  onClick={() => unassignService(service.id)}
                  className="text-red-600 hover:text-red-800 p-2 border rounded"
                >
                  Desasignar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Aquí irá el selector y botón para asignar nuevos servicios */}
      <div className="p-4 border-t pt-6">
        <h2 className="text-xl font-semibold mb-3">Asignar Nuevo Servicio</h2>
        {/* Implementación pendiente: Dropdown con lista de todos los servicios 
            y un botón que llame a assignService(selectedServiceId) */}
        <p className="text-gray-500">
          (Pendiente: Integrar la lista de todos los servicios disponibles para
          asignación.)
        </p>
        {/* Ejemplo de cómo usarías la función (reemplazar con UI real) */}
        {/* <button onClick={() => assignService(99)} className="bg-green-500 text-white p-2 rounded">Asignar Servicio ID 99</button> */}
      </div>
    </div>
  );
};
