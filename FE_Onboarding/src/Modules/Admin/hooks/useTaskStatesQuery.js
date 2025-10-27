import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";

export const useTaskStatesQuery = () => {
  const queryClient = useQueryClient();

  // 🔹 GET: Obtener todos los estados de tarea
  const taskStatesQuery = useQuery({
    queryKey: ["taskStates"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/EstadosTarea");
      return data.map((state) => ({
        id: state.id,
        name: state.nombre,
        createdAt: state.fecha_Creacion,
        updatedAt: state.fecha_Modificacion,
      }));
    },
  });

  // 🔹 CREATE
  const createTaskState = useMutation({
    mutationFn: async (taskState) => {
      const payload = { nombre: taskState.name };
      const { data } = await axiosClient.post("/EstadosTarea", payload);
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["taskStates"] }),
  });

  // 🔹 UPDATE
  const updateTaskState = useMutation({
    mutationFn: async (taskState) => {
      const payload = { nombre: taskState.name };
      const { data } = await axiosClient.put(
        `/EstadosTarea/${taskState.id}`,
        payload
      );
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["taskStates"] }),
  });

  // 🔹 DELETE
  const deleteTaskState = useMutation({
    mutationFn: async (id) => {
      await axiosClient.delete(`/EstadosTarea/${id}`);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["taskStates"] }),
  });

  return {
    taskStatesQuery,
    createTaskState,
    updateTaskState,
    deleteTaskState,
  };
};
