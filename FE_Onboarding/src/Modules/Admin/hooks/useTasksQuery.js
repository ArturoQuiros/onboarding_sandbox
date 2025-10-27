// src/Modules/Admin/hooks/useTasksQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";

const stringifyIfObject = (value) => {
  if (typeof value === "object" && value !== null) {
    try {
      return JSON.stringify(value);
    } catch (e) {
      console.error("Error serializando JSON para la API:", e);
      return "";
    }
  }
  return String(value || "");
};

export const useTasksQuery = (serviceId) => {
  const queryClient = useQueryClient();
  const numericServiceId = Number(serviceId);

  // 🔹 GET: Obtener tareas filtradas por serviceId
  const tasksQuery = useQuery({
    queryKey: ["tasks", numericServiceId],
    queryFn: async () => {
      const { data } = await axiosClient.get("/Tareas");
      return data
        .filter((t) => t.id_Servicio === numericServiceId)
        .map((t) => ({
          id: t.id,
          id_Servicio: t.id_Servicio,
          name: t.nombre,
          description: t.descripcion,
          esInterno: t.esInterno,
          createdAt: t.fecha_Creacion,
          updatedAt: t.fecha_Modificacion,
        }));
    },
    enabled: !!numericServiceId,
  });

  // 🔹 CREATE
  const createTask = useMutation({
    mutationFn: async (task) => {
      const payload = {
        id_Servicio: numericServiceId,
        nombre: task.name,
        descripcion: stringifyIfObject(task.description),
        esInterno: task.isInternal,
      };
      const { data } = await axiosClient.post("/Tareas", payload);
      return {
        id: data.id,
        id_Servicio: data.id_Servicio,
        name: data.nombre,
        description: data.descripcion,
        esInterno: data.esInterno,
        createdAt: data.fecha_Creacion,
        updatedAt: data.fecha_Modificacion,
      };
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", numericServiceId] }),
  });

  // 🔹 UPDATE
  const updateTask = useMutation({
    mutationFn: async (task) => {
      const payload = {
        id: task.id,
        id_Servicio: numericServiceId,
        nombre: task.name,
        descripcion: stringifyIfObject(task.description),
        esInterno: task.isInternal,
      };
      const { data } = await axiosClient.put(`/Tareas/${task.id}`, payload);
      return {
        id: data.id,
        id_Servicio: data.id_Servicio,
        name: data.nombre,
        description: data.descripcion,
        esInterno: data.esInterno,
        createdAt: data.fecha_Creacion,
        updatedAt: data.fecha_Modificacion,
      };
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", numericServiceId] }),
  });

  // 🔹 DELETE
  const deleteTask = useMutation({
    mutationFn: async (id) => {
      await axiosClient.delete(`/Tareas/${id}`);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", numericServiceId] }),
  });

  return {
    tasksQuery,
    createTask,
    updateTask,
    deleteTask,
  };
};
