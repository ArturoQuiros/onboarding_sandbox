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
      // 1. 🌟 NUEVA LÓGICA: Sincronizar AD antes de obtener los datos 🌟
      // Ejecuta la acción de sincronización. No necesitamos la respuesta, solo esperar que termine.
      await axiosClient.get("/User/Inside/Inside/GetAllSync"); // 2. Obtener los usuarios con los datos recién sincronizados

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
        enabled: user.estado,
        createdAt: user.fecha_Creacion,
        updatedAt: user.fecha_Modificacion,
      }));
    },
    enabled:
      rolesQuery.isSuccess &&
      countriesQuery.isSuccess &&
      !!roleMap &&
      !!countryMap,
  });

  const updateInternalUserRole = useMutation({
    mutationFn: async ({ userId, newRoleId }) => {
      const payload = { id_Rol: newRoleId };
      return axiosClient.put(`/User/Inside/${userId}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insideUsers"] });
    },
  });

  const toggleInternalUserStatus = useMutation({
    mutationFn: async ({ userId, newStatus }) => {
      const payload = { estado: newStatus };
      return axiosClient.patch(`/User/Inside/${userId}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insideUsers"] });
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
// HOOK SEPARADO PARA SÓLO DISPARAR LA SINCRONIZACIÓN MANUALMENTE
// ----------------------------------------------------------------------

export const useADSyncMutation = () => {
  const queryClient = useQueryClient();

  const adSyncMutation = useMutation({
    mutationFn: async () => {
      // Llama al endpoint de sincronización
      return axiosClient.get("/WS_Onboarding/User/Inside/Inside/GetAllSync");
    },
    onSuccess: () => {
      // Invalida la lista de usuarios para que se refetch (vuelva a ejecutar)
      // la query principal (que ahora incluye la sincronización)
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
