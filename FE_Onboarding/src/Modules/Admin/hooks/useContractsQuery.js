// src/Modules/Admin/hooks/useContractsQuery.js (REVISADO)

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import axiosClient from "../../../Api/axiosClient";
// 🚨 Usamos los hooks reales que proporcionaste
import { useCustomersQuery } from "./useCustomersQuery";
import { useInternalUsersQuery } from "../../Admin/hooks/useInternalUsersQuery"; // Asegúrate de la ruta correcta

export const useContractsQuery = () => {
  const queryClient = useQueryClient();

  // 1. Obtener datos de dependencias
  const { customersQuery } = useCustomersQuery();
  const { internalUsersQuery } = useInternalUsersQuery(); // Ahora se llama internalUsersQuery

  // 🔹 Crear mapa de Clientes: { id_cliente: nombre_cliente }
  const customerMap = useMemo(() => {
    if (!customersQuery.data) return {};
    return customersQuery.data.reduce((map, customer) => {
      map[customer.id] = customer.name;
      return map;
    }, {});
  }, [customersQuery.data]);

  // 🔹 Crear mapa de Usuarios Internos (Account Managers): { id_usuario: nombre_usuario }
  const userMap = useMemo(() => {
    if (!internalUsersQuery.data) return {};
    return internalUsersQuery.data.reduce((map, user) => {
      map[user.id] = user.name;
      return map;
    }, {});
  }, [internalUsersQuery.data]);

  // 2. GET: Obtener Contratos
  const contractsQuery = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/Contrato");

      return data.map((c) => ({
        id: c.id,
        // ✅ Mapeo correcto con customerMap
        client: customerMap[c.id_Cliente] || `ID Cliente ${c.id_Cliente}`,
        // ✅ Mapeo correcto con userMap (Internal Users)
        accountManager:
          userMap[c.account_manager] || `ID Usuario ${c.account_manager}`,
        status: c.estado,
        id_Cliente: c.id_Cliente,
        account_manager: c.account_manager,
        createdAt: c.fecha_Creacion,
        updatedAt: c.fecha_Modificacion,
      }));
    },
    // Habilitar solo cuando las dependencias y sus mapas estén listos
    enabled:
      customersQuery.isSuccess &&
      internalUsersQuery.isSuccess && // Usamos el nombre correcto
      !!customerMap &&
      !!userMap,
  });

  // 3. Mutaciones (Sin cambios en la lógica, solo en la devolución)

  // CREATE
  const createContract = useMutation({
    mutationFn: async (contract) => {
      // ... (Lógica de creación aquí) ...
      const payload = {
        id_Cliente: contract.id_Cliente,
        estado: contract.status,
        account_manager: contract.account_manager,
      };
      const { data } = await axiosClient.post("/Contrato", payload);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contracts"] }),
  });

  // UPDATE
  const updateContract = useMutation({
    mutationFn: async (contract) => {
      // ... (Lógica de actualización aquí) ...
      const payload = {
        id_Cliente: contract.id_Cliente,
        estado: contract.status,
        account_manager: contract.account_manager,
      };
      const { data } = await axiosClient.put(
        `/Contrato/${contract.id}`,
        payload
      );
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contracts"] }),
  });

  // DELETE
  const deleteContract = useMutation({
    mutationFn: async (id) => {
      await axiosClient.delete(`/Contrato/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contracts"] }),
  });

  return {
    contractsQuery,
    customersQuery,
    internalUsersQuery, // Devolvemos el hook real
    createContract,
    updateContract,
    deleteContract,
  };
};
