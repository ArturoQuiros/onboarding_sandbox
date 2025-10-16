import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";

export const useContractServicesQuery = (contractId) => {
  const queryClient = useQueryClient();

  // Debug: ver contractId
  console.log("[useContractServicesQuery] contractId:", contractId);

  // 1. Obtener detalle del contrato
  const contractDetailQuery = useQuery({
    queryKey: ["contractDetail", contractId],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/Contrato/${contractId}`);
      console.log("[contractDetailQuery] data:", data);
      return { id_Contrato: data.id, idPais: data.id_Pais };
    },
    enabled: !!contractId,
    staleTime: 1000 * 60 * 5,
  });

  const idPais = contractDetailQuery.data?.idPais;

  // 2. Obtener servicios disponibles para ese País
  const availableServicesQuery = useQuery({
    queryKey: ["availableServices", idPais],
    queryFn: async () => {
      // Endpoint: /Servicio/ByIdPais?IdPais={id}
      const { data } = await axiosClient.get(
        `/Servicio/ByIdPais?IdPais=${idPais}`
      );
      console.log("[availableServicesQuery] data:", data);
      return data.map((s) => ({ id: s.id, nombre: s.nombre }));
    },
    enabled: contractDetailQuery.isSuccess && !!idPais,
  });

  // 3. Obtener relaciones de servicios ya asignados al contrato
  const assignedRelationsQuery = useQuery({
    queryKey: ["assignedRelations", contractId],
    queryFn: async () => {
      const { data: relationships } = await axiosClient.get(
        `/ContratoServicio/ByContrato?idContrato=${contractId}`
      );
      console.log(
        "[assignedRelationsQuery] relationships data:",
        relationships
      );

      // 🔑 CORRECCIÓN CLAVE: El mapa solo debe incluir los servicios donde 'estado' es TRUE.
      const assignedMap = new Map();

      // Filtramos las relaciones activas antes de agregarlas al mapa
      relationships
        .filter((rel) => rel.estado === true)
        .forEach((rel) => assignedMap.set(rel.id_Servicio, rel.id)); // Usamos el ID de la relación como valor si lo necesitamos

      return assignedMap;
    },
    enabled: !!contractId,
  });

  // 4. Mutación para contratar/descontratar un servicio (Lógica ya corregida y unificada)
  const toggleAssignmentMutation = useMutation({
    mutationFn: async ({ serviceId, isAssigned }) => {
      const payload = {
        id_Contrato: Number(contractId),
        id_Servicio: serviceId,
        estado: isAssigned, // true (check) para asignar, false (uncheck) para desasignar
      };

      const response = await axiosClient.post(
        "/ContratoServicio/RelacionContratoServicio",
        payload
      );

      return {
        action: isAssigned ? "ASSIGNED" : "UNASSIGNED",
        response: response.data,
      };
    },
    onSuccess: () => {
      // Invalida las relaciones para refrescar la tabla y el estado del checkbox
      queryClient.invalidateQueries({
        queryKey: ["assignedRelations", contractId],
      });
    },
  });

  return {
    contractDetailQuery,
    availableServicesQuery,
    assignedRelationsQuery,
    toggleAssignmentMutation,
    idPais,
  };
};
