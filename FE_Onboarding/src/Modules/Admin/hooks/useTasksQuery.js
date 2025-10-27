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

  // 🔹 GET
  const tasksQuery = useQuery({
    queryKey: ["tasks", numericServiceId],
    queryFn: async () => {
      const { data } = await axiosClient.get("/Tareas");
      return data
        .filter((t) => t.id_Servicio === numericServiceId)
        .map((t) => ({
          id: t.id,
          id_Service: t.id_Servicio,
          name: t.nombre,
          description: t.descripcion,
          isInternal: t.esInterno,
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
        nombre: task.name ?? task.nombre ?? "",
        descripcion: stringifyIfObject(
          task.description ?? task.descripcion ?? ""
        ),
        esInterno: task.isInternal ?? task.esInterno ?? false,
      };
      console.log("📤 POST payload:", payload);
      const { data } = await axiosClient.post("/Tareas", payload);
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", numericServiceId] }),
  });

  // 🔹 UPDATE
  const updateTask = useMutation({
    mutationFn: async (task) => {
      const payload = {
        id_Servicio: numericServiceId,
        nombre: task.name ?? task.nombre ?? "",
        descripcion: stringifyIfObject(
          task.description ?? task.descripcion ?? ""
        ),
        esInterno: task.isInternal ?? task.esInterno ?? false,
      };
      console.log("📤 PUT payload:", payload);
      const { data } = await axiosClient.put(`/Tareas/${task.id}`, payload);
      return data;
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
