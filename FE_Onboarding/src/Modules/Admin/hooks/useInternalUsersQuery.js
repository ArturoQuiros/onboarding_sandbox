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
      const { data } = await axiosClient.get("/User/Inside");
      return data.map((user) => ({
        id: user.id,
        name: user.nombre,
        email: user.email,
        puesto: user.puesto, // 👈 AÑADIDO: Extraemos el puesto del usuario
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

  // ... (Las mutaciones no cambian)
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
