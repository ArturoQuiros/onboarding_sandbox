// src/hooks/useInternalUsersQuery.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";
import { useRolesQuery } from "./useRolesQuery";
import { useCountriesQuery } from "./useCountriesQuery";

export const useInternalUsersQuery = () => {
  const queryClient = useQueryClient();
  const { rolesQuery, roleMap } = useRolesQuery();
  const { countriesQuery, countryMap } = useCountriesQuery();

  const internalUsersQuery = useQuery({
    queryKey: ["insideUsers"],
    queryFn: async () => {
      // 1. 🌟 Lógica de Sincronización (OK: Asumimos que trae todos los estados)
      await axiosClient.get("/User/Inside/Inside/GetAllSync"); // 2. Obtener los usuarios (DEBE TRAER TODOS, incluidos los deshabilitados)

      const { data } = await axiosClient.get("/User/Inside");
      return data.map((user) => ({
        id: user.id,
        name: user.nombre,
        email: user.email,
        puesto: user.puesto,
        roleName: roleMap[user.id_Rol] || "Sin Rol",
        roleId: user.id_Rol,
        countryName: countryMap[user.id_Pais] || "Sin País",
        countryId: user.id_Pais,
        enabled: user.estado, // El campo 'enabled' es clave para la UI
        createdAt: user.fecha_Creacion,
        updatedAt: user.fecha_Modificacion,
      }));
    },
    enabled:
      rolesQuery.isSuccess &&
      countriesQuery.isSuccess &&
      !!roleMap &&
      !!countryMap,
  }); // Mutación de Actualización de Rol (Mantenemos invalidación ya que los roles no cambian tanto)

  const updateInternalUserRole = useMutation({
    mutationFn: async ({ userId, newRoleId }) => {
      const payload = { id_Rol: newRoleId };
      return axiosClient.put(`/User/Inside/${userId}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insideUsers"] });
    },
  }); // Mutación de Toggle de Estado (CORREGIDA para actualización local)

  const toggleInternalUserStatus = useMutation({
    mutationFn: async ({ userId, newStatus }) => {
      const payload = { estado: newStatus };
      return axiosClient.patch(`/User/Inside/${userId}`, payload);
    }, // 🛑 CORRECCIÓN CLAVE: Usamos setQueryData para actualizar la caché sin recargar la lista
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["insideUsers"], (oldUsers) => {
        if (!oldUsers) return []; // Si no hay datos, retorna un array vacío.

        return oldUsers.map((user) => {
          // Si encontramos el usuario, actualizamos su campo 'enabled' (estado)
          if (user.id === variables.userId) {
            return {
              ...user,
              enabled: variables.newStatus, // Si tu API devuelve el objeto actualizado, puedes usar data.estado: // enabled: data.estado
            };
          }
          return user;
        });
      });
    },
  });

  return {
    internalUsersQuery,
    rolesQuery,
    countriesQuery,
    updateInternalUserRole,
    toggleInternalUserStatus,
  };
};

// ----------------------------------------------------------------------
// HOOK SEPARADO PARA SÓLO DISPARAR LA SINCRONIZACIÓN MANUALMENTE (Sin cambios)
// ----------------------------------------------------------------------

export const useADSyncMutation = () => {
  const queryClient = useQueryClient();

  const adSyncMutation = useMutation({
    mutationFn: async () => {
      return axiosClient.get("/User/Inside/Inside/GetAllSync");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insideUsers"] });
      console.log(
        "Sincronización con AD completada y lista de usuarios invalidada."
      );
    },
    onError: (error) => {
      console.error("Error durante la sincronización con AD:", error);
    },
  });

  return adSyncMutation;
};
