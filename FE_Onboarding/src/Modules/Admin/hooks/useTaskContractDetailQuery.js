// src/Modules/Admin/hooks/useTaskContractDetailQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";

const parseTaskForm = (descripcion) => {
  if (!descripcion) return null;
  try {
    const parsed = JSON.parse(descripcion);
    if (parsed.fields || parsed.sections) return parsed;
  } catch (e) {
    console.warn("Descripción no es JSON válido:", descripcion);
  }
  return null;
};

const parseJSON = (jsonString) => {
  if (!jsonString) return null;
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.warn("Error parseando json_Respuesta:", e);
  }
  return null;
};

export const useTaskContractDetailQuery = (taskContractId) => {
  const queryClient = useQueryClient();

  const taskDetailQuery = useQuery({
    queryKey: ["taskContractDetail", taskContractId],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/TareaContrato/GetByIdFull`, {
        params: { Id_TareaContrato: taskContractId },
      });

      // Parsear la descripción para obtener el nombre de la tarea
      const formData = parseTaskForm(data.descripcion);

      return {
        taskId: data.tareaContrato.id,
        contractId: data.tareaContrato.id_Contrato,
        taskDefinitionId: data.tareaContrato.id_Tarea,
        responsible: data.tareaContrato.id_UsuarioResponsable,
        status: data.tareaContrato.id_Estado,
        isActive: data.tareaContrato.estado,
        observations: data.tareaContrato.observaciones,
        savedData: parseJSON(data.tareaContrato.json_Respuesta),
        form: formData,
        label: formData?.title || `Task ${data.tareaContrato.id_Tarea}`, // Nombre del form
        isInternal: data.esInterno,
      };
    },
    enabled: !!taskContractId,
    staleTime: 5 * 60 * 1000, // Cache 5 minutos
  });

  const updateTaskContract = useMutation({
    mutationFn: async ({ formData, newState }) => {
      if (!taskDetailQuery.data) {
        throw new Error("Task data not loaded");
      }

      const currentTask = taskDetailQuery.data;

      const payload = {
        id_Contrato: currentTask.contractId,
        id_Tarea: currentTask.taskDefinitionId,
        id_UsuarioResponsable: currentTask.responsible,
        id_Estado: newState || currentTask.status,
        estado: true,
        json_Respuesta: formData ? JSON.stringify(formData) : null,
        observaciones: currentTask.observations || "",
      };

      const { data } = await axiosClient.put(
        `/TareaContrato/${taskContractId}`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["taskContractDetail", taskContractId],
      });
      queryClient.invalidateQueries({
        queryKey: ["contractTasks"],
      });
    },
  });

  return {
    taskDetail: taskDetailQuery.data,
    isLoading: taskDetailQuery.isLoading,
    error: taskDetailQuery.error,
    updateTaskContract,
    refetch: taskDetailQuery.refetch,
  };
};
