// src/Modules/Admin/hooks/useCustomersQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";

export const useCustomersQuery = () => {
  const queryClient = useQueryClient();

  // 🔹 GET: Obtener clientes
  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/Cliente");
      return data.map((c) => ({
        id: c.id,
        name: c.nombre,
        email: c.email,
        phone: c.telefono,
        address: c.direccion,
      }));
    },
  });

  // 🔹 CREATE
  const createCustomer = useMutation({
    mutationFn: async (customer) => {
      const payload = {
        nombre: customer.name,
        email: customer.email,
        telefono: customer.phone,
        direccion: customer.address,
      };
      const { data } = await axiosClient.post("/Cliente", payload);
      return {
        id: data.id,
        name: data.nombre,
        email: data.email,
        phone: data.telefono,
        address: data.direccion,
      };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
  });

  // 🔹 UPDATE
  const updateCustomer = useMutation({
    mutationFn: async (customer) => {
      const payload = {
        id: customer.id,
        nombre: customer.name,
        email: customer.email,
        telefono: customer.phone,
        direccion: customer.address,
      };
      const { data } = await axiosClient.put(
        `/Cliente/${customer.id}`,
        payload
      );
      return {
        id: data.id,
        name: data.nombre,
        email: data.email,
        phone: data.telefono,
        address: data.direccion,
      };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
  });

  // 🔹 DELETE
  const deleteCustomer = useMutation({
    mutationFn: async (id) => {
      await axiosClient.delete(`/Cliente/${id}`);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
  });

  return {
    customersQuery,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};
