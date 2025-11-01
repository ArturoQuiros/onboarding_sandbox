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

  // 🔹 GET: Filtrado por servicio (comportamiento original)
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

  // 🔹 GET: TODAS las tareas (sin filtro) - NUEVO
  const allTasksQuery = useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/Tareas");
      return data.map((t) => ({
        id: t.id,
        id_Service: t.id_Servicio,
        name: t.nombre,
        isInternal: t.esInterno,
      }));
    },
    staleTime: 10 * 60 * 1000, // Cache 10 minutos
  });

  // 🔹 Mapa de tareas para acceso rápido - NUEVO
  const tasksMap =
    allTasksQuery.data?.reduce((acc, task) => {
      acc[task.id] = task;
      return acc;
    }, {}) || {};

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
      const { data } = await axiosClient.post("/Tareas", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", numericServiceId] });
      queryClient.invalidateQueries({ queryKey: ["allTasks"] }); // 🔹 Invalida cache global
    },
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
      const { data } = await axiosClient.put(`/Tareas/${task.id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", numericServiceId] });
      queryClient.invalidateQueries({ queryKey: ["allTasks"] }); // 🔹 Invalida cache global
    },
  });

  // 🔹 DELETE
  const deleteTask = useMutation({
    mutationFn: async (id) => {
      await axiosClient.delete(`/Tareas/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", numericServiceId] });
      queryClient.invalidateQueries({ queryKey: ["allTasks"] }); // 🔹 Invalida cache global
    },
  });

  return {
    tasksQuery, // Query filtrada por servicio (original)
    allTasksQuery, // 🔹 NUEVA: Query de todas las tareas
    tasksMap, // 🔹 NUEVO: Mapa para acceso rápido { id: task }
    createTask,
    updateTask,
    deleteTask,
  };
};
