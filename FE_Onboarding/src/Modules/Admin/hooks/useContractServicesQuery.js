import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";

export const useContractServicesQuery = (contractId) => {
  const queryClient = useQueryClient();

  // Debug: ver contractId
  console.log("[useContractServicesQuery] contractId:", contractId);

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

  const availableServicesQuery = useQuery({
    queryKey: ["availableServices", idPais],
    queryFn: async () => {
      const { data } = await axiosClient.get(
        `/Servicio/ByCountry?idPais=${idPais}`
      );
      console.log("[availableServicesQuery] data:", data);
      return data.map((s) => ({ id: s.id, nombre: s.nombre }));
    },
    enabled: contractDetailQuery.isSuccess && !!idPais,
  });

  const assignedRelationsQuery = useQuery({
    queryKey: ["assignedRelations", contractId],
    queryFn: async () => {
      const { data } = await axiosClient.get(
        `/ContratoServicio/ByContrato?idContrato=${contractId}`
      );
      console.log("[assignedRelationsQuery] data:", data);

      const assignedMap = new Map();
      data.forEach((rel) => assignedMap.set(rel.id_Servicio, rel.id));
      return assignedMap;
    },
    enabled: !!contractId,
  });

  const toggleAssignmentMutation = useMutation({
    mutationFn: async ({ serviceId, isAssigned }) => {
      const assignedMap = assignedRelationsQuery.data || new Map();

      if (isAssigned) {
        const payload = {
          id_Contrato: Number(contractId),
          id_Servicio: serviceId,
        };
        const response = await axiosClient.post("/ContratoServicio", payload);
        return { action: "ASSIGNED", newRelationshipId: response.data.id };
      } else {
        const relationshipId = assignedMap.get(serviceId);
        if (!relationshipId)
          throw new Error("Relación no encontrada para desasignar.");
        await axiosClient.delete(`/ContratoServicio/${relationshipId}`);
        return { action: "UNASSIGNED" };
      }
    },
    onSuccess: () => {
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
