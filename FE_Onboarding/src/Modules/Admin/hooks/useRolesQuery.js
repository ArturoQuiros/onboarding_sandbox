// src/Modules/Admin/hooks/useRolesQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import axiosClient from "../../../Api/axiosClient";

export const useRolesQuery = () => {
  const queryClient = useQueryClient();

  // 🔹 GET: Obtener roles
  const rolesQuery = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/Rol");
      return data.map((r) => ({
        id: r.id,
        name: r.nombre,
        nombre: r.nombre, // Para compatibilidad
      }));
    },
  });

  // 🔹 Crear mapa: { id_rol: nombre_rol }
  const roleMap = useMemo(() => {
    if (!rolesQuery.data) return {};
    return rolesQuery.data.reduce((map, role) => {
      map[role.id] = role.nombre || role.name;
      return map;
    }, {});
  }, [rolesQuery.data]);

  // 🔹 CREATE: Crear rol
  const createRole = useMutation({
    mutationFn: async (role) => {
      const payload = {
        nombre: role.name,
      };
      const { data } = await axiosClient.post("/Rol", payload);
      return {
        id: data.id,
        name: data.nombre,
        nombre: data.nombre,
      };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] }),
  });

  // 🔹 UPDATE: Actualizar rol
  const updateRole = useMutation({
    mutationFn: async (role) => {
      const payload = {
        nombre: role.name,
      };
      const { data } = await axiosClient.put(`/Rol/${role.id}`, payload);
      return {
        id: data.id,
        name: data.nombre,
        nombre: data.nombre,
      };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] }),
  });

  // 🔹 DELETE: Eliminar rol
  const deleteRole = useMutation({
    mutationFn: async (id) => {
      await axiosClient.delete(`/Rol/${id}`);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] }),
  });

  return {
    rolesQuery,
    roleMap, // Para usar en otros hooks
    createRole,
    updateRole,
    deleteRole,
  };
};
