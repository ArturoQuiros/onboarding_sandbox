// src/Modules/Admin/hooks/useTaskContractsQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";
import { useTasksQuery } from "./useTasksQuery";
import { useTaskStatesQuery } from "./useTaskStatesQuery";
import { useInternalUsersQuery } from "../../Admin/hooks/useInternalUsersQuery";
import { useContractsQuery } from "./useContractsQuery";

export const useTaskContractsQuery = () => {
  const queryClient = useQueryClient();

  // 🔹 Dependencias
  const { tasksQuery, taskMap } = useTasksQuery();
  const { taskStatesQuery, taskStateMap } = useTaskStatesQuery();
  const { internalUsersQuery } = useInternalUsersQuery();
  const { contractsQuery } = useContractsQuery();

  // Crear mapa de usuarios internos
  const userMap =
    internalUsersQuery.data?.reduce((acc, u) => {
      acc[u.id] = u.name;
      return acc;
    }, {}) || {};

  // Crear mapa de contratos
  const contractMap =
    contractsQuery.data?.reduce((acc, c) => {
      acc[c.id] = c.client;
      return acc;
    }, {}) || {};

  // 🔹 GET: Obtener todas las tareas asociadas a contratos
  const taskContractsQuery = useQuery({
    queryKey: ["taskContracts"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/TareaContrato/GetAllFull");
      return data.map((t) => ({
        id: t.id,
        contract: contractMap[t.id_Contrato] || `Contract ID ${t.id_Contrato}`,
        task: taskMap[t.id_Tarea] || `Task ID ${t.id_Tarea}`,
        responsible:
          userMap[t.id_UsuarioResponsable] ||
          `User ID ${t.id_UsuarioResponsable}`,
        state: taskStateMap[t.id_Estado] || `State ID ${t.id_Estado}`,
        jsonResponse: t.json_Respuesta,
        notes: t.observaciones,
      }));
    },
    enabled:
      tasksQuery.isSuccess &&
      taskStatesQuery.isSuccess &&
      internalUsersQuery.isSuccess &&
      contractsQuery.isSuccess,
  });

  // 🔹 CREATE
  const createTaskContract = useMutation({
    mutationFn: async (taskContract) => {
      const payload = {
        id_Contrato: taskContract.id_Contrato,
        id_Tarea: taskContract.id_Tarea,
        id_UsuarioResponsable: taskContract.id_UsuarioResponsable,
        id_Estado: taskContract.id_Estado,
        json_Respuesta: taskContract.json_Respuesta,
        observaciones: taskContract.observaciones,
      };
      const { data } = await axiosClient.post("/TareaContrato", payload);
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["taskContracts"] }),
  });

  // 🔹 UPDATE
  const updateTaskContract = useMutation({
    mutationFn: async (taskContract) => {
      const payload = {
        id_Contrato: taskContract.id_Contrato,
        id_Tarea: taskContract.id_Tarea,
        id_UsuarioResponsable: taskContract.id_UsuarioResponsable,
        id_Estado: taskContract.id_Estado,
        json_Respuesta: taskContract.json_Respuesta,
        observaciones: taskContract.observaciones,
      };
      const { data } = await axiosClient.put(
        `/TareaContrato/${taskContract.id}`,
        payload
      );
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["taskContracts"] }),
  });

  // 🔹 DELETE
  const deleteTaskContract = useMutation({
    mutationFn: async (id) => {
      await axiosClient.delete(`/TareaContrato/${id}`);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["taskContracts"] }),
  });

  return {
    taskContractsQuery,
    createTaskContract,
    updateTaskContract,
    deleteTaskContract,
    taskMap,
    taskStateMap,
    userMap,
    contractMap,
  };
};
