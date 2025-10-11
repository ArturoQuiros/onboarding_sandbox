// src/Modules/Admin/hooks/useServicesQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";
import { useCountriesQuery } from "./useCountriesQuery";

export const useServicesQuery = () => {
  const queryClient = useQueryClient();
  const { countriesQuery, countryMap } = useCountriesQuery();

  // 🔹 GET: Obtener servicios
  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data: services } = await axiosClient.get("/Servicio");

      // Usar countryMap directamente (ya está protegido en el hook)
      return services.map((s) => ({
        id: s.id,
        name: s.nombre,
        countryName: countryMap[s.id_pais] || "Desconocido",
        id_pais: s.id_pais,
      }));
    },
    enabled: countriesQuery.isSuccess && !!countryMap, // Espera países Y countryMap
  });

  // 🔹 CREATE: Crear servicio
  const createService = useMutation({
    mutationFn: async (item) => {
      const payload = { nombre: item.name, id_pais: item.id_pais };
      const { data: newService } = await axiosClient.post("/Servicio", payload);

      return {
        id: newService.id,
        name: newService.nombre,
        countryName: countryMap[newService.id_pais] || "Desconocido",
        id_pais: newService.id_pais,
      };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });

  // 🔹 UPDATE: Actualizar servicio
  const updateService = useMutation({
    mutationFn: async (item) => {
      const payload = { id: item.id, nombre: item.name, id_pais: item.id_pais };
      const { data: updatedService } = await axiosClient.put(
        `/Servicio/${item.id}`,
        payload
      );

      return {
        id: updatedService.id,
        name: updatedService.nombre,
        countryName: countryMap[updatedService.id_pais] || "Desconocido",
        id_pais: updatedService.id_pais,
      };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });

  // 🔹 DELETE: Eliminar servicio
  const deleteService = useMutation({
    mutationFn: async (id) => {
      await axiosClient.delete(`/Servicio/${id}`);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });

  return {
    servicesQuery,
    createService,
    updateService,
    deleteService,
    countriesQuery,
    countryMap,
  };
};
