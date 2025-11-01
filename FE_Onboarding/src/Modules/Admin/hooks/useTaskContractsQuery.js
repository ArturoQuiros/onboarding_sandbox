// src/Modules/Admin/hooks/useContractTasksQuery.js
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";
import { useServicesQuery } from "./useServicesQuery";
import { useTasksQuery } from "./useTasksQuery";

export const useContractTasksQuery = (contractId) => {
  const { servicesQuery } = useServicesQuery();

  // 🔹 Usar el hook existente sin serviceId para obtener todas las tareas
  const { tasksMap } = useTasksQuery(null); // null = no filtrar, usar allTasksQuery

  const contractTasksQuery = useQuery({
    queryKey: ["contractTasks", contractId],
    queryFn: async () => {
      const { data } = await axiosClient.get(
        `/TareaContrato/GetByContratoSimple`,
        {
          params: { Id_Contrato: contractId },
        }
      );
      return data;
    },
    enabled: !!contractId,
  });

  const servicesMap =
    servicesQuery.data?.reduce((acc, service) => {
      acc[service.id] = service.name;
      return acc;
    }, {}) || {};

  const services =
    contractTasksQuery.data?.map((service) => ({
      serviceId: service.id_Servicio,
      title:
        servicesMap[service.id_Servicio] || `Service ${service.id_Servicio}`,
      tasks: service.tasks
        .filter((taskContract) => taskContract.estado)
        .map((taskContract) => {
          const taskInfo = tasksMap[taskContract.id_Tarea];

          return {
            taskId: taskContract.id,
            taskDefinitionId: taskContract.id_Tarea,
            contractId: taskContract.id_Contrato,
            label: taskInfo?.name || `Task ${taskContract.id_Tarea}`,
            status: taskContract.id_Estado,
            observations: taskContract.observaciones,
            responsible: taskContract.id_UsuarioResponsable,
            isActive: taskContract.estado,
            isInternal: taskInfo?.isInternal || false,
          };
        }),
    })) || [];

  const isLoading = contractTasksQuery.isLoading || servicesQuery.isLoading;

  const error = contractTasksQuery.error || servicesQuery.error;

  return {
    services,
    isLoading,
    error,
    refetch: () => {
      contractTasksQuery.refetch();
      servicesQuery.refetch();
    },
  };
};
