// src/Modules/Admin/hooks/useTasksQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";
import { useServicesQuery } from "./useServicesQuery";

export const useTasksQuery = () => {
  const queryClient = useQueryClient();
  const { servicesQuery, serviceMap } = useServicesQuery();

  // 🔹 GET: Obtener tareas base (plantillas)
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/Tareas");
      return data.map((t) => ({
        id: t.id,
        service: serviceMap[t.id_Servicio] || `Service ID ${t.id_Servicio}`,
        id_Service: t.id_Servicio,
        name: t.nombre,
        description: t.descripcion,
        isInternal: t.esInterno,
        createdAt: t.fecha_Creacion,
        updatedAt: t.fecha_Modificacion,
      }));
    },
    enabled: servicesQuery.isSuccess && !!serviceMap,
  });

  // 🔹 CREATE
  const createTask = useMutation({
    mutationFn: async (task) => {
      const payload = {
        id_Servicio: task.id_Service,
        nombre: task.name,
        descripcion: task.description,
        esInterno: task.isInternal,
      };
      const { data } = await axiosClient.post("/Tareas", payload);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // 🔹 UPDATE
  const updateTask = useMutation({
    mutationFn: async (task) => {
      const payload = {
        id_Servicio: task.id_Service,
        nombre: task.name,
        descripcion: task.description,
        esInterno: task.isInternal,
      };
      const { data } = await axiosClient.put(`/Tareas/${task.id}`, payload);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // 🔹 DELETE
  const deleteTask = useMutation({
    mutationFn: async (id) => {
      await axiosClient.delete(`/Tareas/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // 🔹 Mapa de tareas: { id: nombre }
  const taskMap =
    tasksQuery.data?.reduce((acc, task) => {
      acc[task.id] = task.name;
      return acc;
    }, {}) || {};

  return {
    tasksQuery,
    createTask,
    updateTask,
    deleteTask,
    servicesQuery,
    serviceMap,
    taskMap,
  };
};
