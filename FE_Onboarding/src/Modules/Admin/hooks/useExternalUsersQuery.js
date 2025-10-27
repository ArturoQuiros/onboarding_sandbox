// src/Modules/Admin/hooks/useExternalUsersQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import axiosClient from "../../../Api/axiosClient";
import { useRolesQuery } from "./useRolesQuery";
import { useCustomersQuery } from "./useCustomersQuery";

export const useExternalUsersQuery = () => {
  const queryClient = useQueryClient();

  // ✅ Reutilizar hooks existentes
  const { rolesQuery, roleMap } = useRolesQuery();
  const { customersQuery } = useCustomersQuery();

  // 🔹 Crear mapa de clientes: { id_cliente: nombre_cliente }
  const customerMap = useMemo(() => {
    if (!customersQuery.data) return {};
    return customersQuery.data.reduce((map, customer) => {
      map[customer.id] = customer.name;
      return map;
    }, {});
  }, [customersQuery.data]);

  // 🔹 GET: Obtener usuarios externos
  const externalUsersQuery = useQuery({
    queryKey: ["externalUsers"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/User/Outside");
      return data.map((u) => ({
        id: u.id,
        name: u.nombre,
        nombre: u.nombre,
        email: u.email,
        roleName: roleMap[u.id_Rol] || "Sin Rol",
        customerName: customerMap[u.id_Cliente] || "Sin Cliente",
        id_Rol: u.id_Rol,
        id_Cliente: u.id_Cliente,
        status: u.estado,
        createdAt: u.fecha_Creacion,
        updatedAt: u.fecha_Modificacion,
        // NO incluir contraseña en el frontend
      }));
    },
    enabled:
      rolesQuery.isSuccess &&
      customersQuery.isSuccess &&
      !!roleMap &&
      !!customerMap,
  });

  // 🔹 CREATE: Crear usuario externo
  const createExternalUser = useMutation({
    mutationFn: async (user) => {
      const payload = {
        nombre: user.name,
        email: user.email,
        contrasena: user.password,
        id_Rol: user.id_Rol,
        id_Cliente: user.id_Cliente,
      };
      const { data } = await axiosClient.post("/User/Outside", payload);
      return {
        id: data.id,
        name: data.nombre,
        nombre: data.nombre,
        email: data.email,
        roleName: roleMap[data.id_Rol] || "Sin Rol",
        customerName: customerMap[data.id_Cliente] || "Sin Cliente",
        id_Rol: data.id_Rol,
        id_Cliente: data.id_Cliente,
        status: data.estado,
      };
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["externalUsers"] }),
  });

  // 🔹 UPDATE: Actualizar usuario externo (nombre, email, rol)
  const updateExternalUser = useMutation({
    mutationFn: async (user) => {
      const payload = {
        nombre: user.name,
        email: user.email,
        id_Rol: user.id_Rol,
      };

      if (user.password) {
        payload.contrasena = user.password;
      }
      const { data } = await axiosClient.put(
        `/User/Outside/${user.id}`,
        payload
      );

      return {
        id: data.id,
        name: data.nombre,
        nombre: data.nombre,
        email: data.email,
        roleName: roleMap[data.id_Rol] || "Sin Rol",
        customerName: customerMap[data.id_Cliente] || "Sin Cliente",
        id_Rol: data.id_Rol,
        id_Cliente: data.id_Cliente,
        status: data.estado,
      };
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["externalUsers"] }),
  });

  // 🔹 PATCH: Cambiar estado (activar/desactivar)
  const toggleExternalUserStatus = useMutation({
    mutationFn: async ({ userId, newStatus }) => {
      const payload = {
        estado: newStatus,
      };

      const { data } = await axiosClient.patch(
        `/User/Outside/${userId}`,
        payload
      );
      return {
        id: data.id,
        status: data.estado,
      };
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["externalUsers"] }),
  });

  // 🔹 POST: Cambiar contraseña
  const changePassword = useMutation({
    mutationFn: async ({ email, oldPassword, newPassword }) => {
      const payload = {
        contrasenaVieja: oldPassword,
        contrasenaNueva: newPassword,
      };
      await axiosClient.post(`/User/Outside/Password/Change/${email}`, payload);
      return { email, success: true };
    },
    // No invalidar queries, es solo cambio de contraseña
  });

  return {
    externalUsersQuery,
    rolesQuery,
    customersQuery,
    createExternalUser,
    updateExternalUser,
    toggleExternalUserStatus,
    changePassword,
  };
};
