// src/Modules/Admin/hooks/useCountriesQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import axiosClient from "../../../Api/axiosClient";

export const useCountriesQuery = () => {
  const queryClient = useQueryClient();

  // 🔹 GET: Obtener todos los países
  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await axiosClient.get("/Pais");
      return response.data.map((country) => ({
        id: country.id,
        name: country.nombre,
        nombre: country.nombre, // ← Agregado para compatibilidad
      }));
    },
  });

  // 🔹 Crear mapa: { id_pais: nombre_pais }
  const countryMap = useMemo(() => {
    if (!countriesQuery.data) return {};

    return countriesQuery.data.reduce((map, country) => {
      map[country.id] = country.nombre || country.name;
      return map;
    }, {});
  }, [countriesQuery.data]);

  // 🔹 CREATE: Crear país
  const createCountry = useMutation({
    mutationFn: async (country) => {
      const response = await axiosClient.post("/Pais", {
        nombre: country.name,
      });
      return { id: response.data.id, name: response.data.nombre };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["countries"] }),
  });

  // 🔹 UPDATE: Actualizar país
  const updateCountry = useMutation({
    mutationFn: async (country) => {
      const response = await axiosClient.put(`/Pais/${country.id}`, {
        id: country.id,
        nombre: country.name,
      });
      return { id: response.data.id, name: response.data.nombre };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["countries"] }),
  });

  // 🔹 DELETE: Eliminar país
  const deleteCountry = useMutation({
    mutationFn: async (id) => {
      await axiosClient.delete(`/Pais/${id}`);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["countries"] }),
  });

  return {
    countriesQuery,
    countryMap, // ← ¡ESTO FALTABA!
    createCountry,
    updateCountry,
    deleteCountry,
  };
};
