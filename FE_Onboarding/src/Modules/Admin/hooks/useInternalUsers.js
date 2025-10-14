import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";
import { useRolesQuery } from "./useRolesQuery";

/**
 * Hook para gestionar usuarios internos del sistema (Staff).
 * Incluye mapeo de roles y conversión del estado booleano a texto.
 */
export const useInsideUsersQuery = () => {
  const queryClient = useQueryClient();
  const { rolesQuery, roleMap } = useRolesQuery();

  // 🔹 GET: Obtener usuarios internos
  const insideUsersQuery = useQuery({
    queryKey: ["insideUsers"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/User/Inside");

      return data.map((u) => ({
        id: u.id,
        name: u.nombre,
        nombre: u.nombre,
        email: u.email,
        roleName: roleMap[u.id_Rol] || "Sin Rol",
        id_Rol: u.id_Rol,
        estado: u.estado ? "Activo" : "Inactivo", // ← Convertimos a texto legible
        createdAt: u.fecha_Creacion,
        updatedAt: u.fecha_Modificacion,
      }));
    },
    enabled: rolesQuery.isSuccess && !!roleMap,
  });

  // 🔹 PUT: Actualizar rol
  const updateInsideUser = useMutation({
    mutationFn: async (user) => {
      const payload = { id_Rol: user.id_Rol };
      const { data } = await axiosClient.put(
        `/User/Inside/${user.id}`,
        payload
      );
      return {
        id: data.id,
        id_Rol: data.id_Rol,
        roleName: roleMap[data.id_Rol] || "Sin Rol",
      };
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["insideUsers"] }),
  });

  // 🔹 PATCH: Cambiar estado (activar/desactivar)
  const toggleInsideUserStatus = useMutation({
    mutationFn: async (user) => {
      const payload = { estado: user.estado === "Activo" }; // ← Convertimos de texto a booleano
      const { data } = await axiosClient.patch(
        `/User/Inside/${user.id}`,
        payload
      );
      return {
        id: data.id,
        estado: data.estado ? "Activo" : "Inactivo",
      };
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["insideUsers"] }),
  });

  return {
    insideUsersQuery,
    rolesQuery,
    updateInsideUser,
    toggleInsideUserStatus,
  };
};
