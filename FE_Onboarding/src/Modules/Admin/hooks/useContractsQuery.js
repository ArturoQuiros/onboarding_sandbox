import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import axiosClient from "../../../Api/axiosClient";
// 🚨 Usamos los hooks reales que proporcionaste
import { useCustomersQuery } from "./useCustomersQuery";
import { useInternalUsersQuery } from "../../Admin/hooks/useInternalUsersQuery";
// 🆕 FALTA ESTA IMPORTACIÓN
import { useCountriesQuery } from "./useCountriesQuery";

export const useContractsQuery = () => {
  const queryClient = useQueryClient();

  // 1. Obtener datos de dependencias
  const { customersQuery } = useCustomersQuery();
  const { internalUsersQuery } = useInternalUsersQuery();
  // 🆕 FALTA ESTA ASIGNACIÓN
  const { countriesQuery, countryMap } = useCountriesQuery();

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
        // 🆕 FALTA ESTO: Mapeo con countryMap
        country: countryMap[c.id_Pais] || `ID País ${c.id_Pais}`,
        status: c.estado,
        id_Cliente: c.id_Cliente,
        account_manager: c.account_manager,
        id_Pais: c.id_Pais, // 🆕 FALTA ESTO: Nuevo campo para el ID del país
        createdAt: c.fecha_Creacion,
        updatedAt: c.fecha_Modificacion,
      }));
    },
    // 🆕 FALTA ESTA DEPENDENCIA
    enabled:
      customersQuery.isSuccess &&
      internalUsersQuery.isSuccess &&
      countriesQuery.isSuccess &&
      !!customerMap &&
      !!userMap &&
      !!countryMap,
  });

  // 3. Mutaciones (Se agrega id_Pais al payload)

  // CREATE
  const createContract = useMutation({
    mutationFn: async (contract) => {
      const payload = {
        id_Cliente: contract.id_Cliente,
        estado: contract.status,
        account_manager: contract.account_manager,
        id_Pais: contract.id_Pais, // 🆕 FALTA ESTO: Agregado al payload
      };
      const { data } = await axiosClient.post("/Contrato", payload);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contracts"] }),
  });

  // UPDATE
  const updateContract = useMutation({
    mutationFn: async (contract) => {
      const payload = {
        id_Cliente: contract.id_Cliente,
        estado: contract.status,
        account_manager: contract.account_manager,
        id_Pais: contract.id_Pais, // 🆕 FALTA ESTO: Agregado al payload
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
    internalUsersQuery,
    countriesQuery, // 🆕 FALTA ESTO: Devolvemos el hook de países
    createContract,
    updateContract,
    deleteContract,
  };
};
