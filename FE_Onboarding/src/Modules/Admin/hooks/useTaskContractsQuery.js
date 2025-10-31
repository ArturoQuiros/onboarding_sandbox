// src/Modules/Client/hooks/useContractTasksQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../Api/axiosClient";
import { useServicesQuery } from "../../Admin/hooks/useServicesQuery";

// 🔹 Helper: Parsear descripción de tarea a formulario
const parseTaskForm = (descripcion) => {
  if (!descripcion) return null;

  try {
    const parsed = JSON.parse(descripcion);
    // Validar que tenga estructura de formulario
    if (parsed.fields || parsed.sections) {
      return parsed;
    }
  } catch (e) {
    console.warn("Descripción no es JSON válido:", descripcion);
  }

  return null;
};

// 🔹 Helper: Parsear JSON guardado
const parseJSON = (jsonString) => {
  if (!jsonString) return null;

  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.warn("Error parseando json_Respuesta:", e);
    return null;
  }
};

export const useContractTasksQuery = (contractId) => {
  const queryClient = useQueryClient();

  // 🔹 Usar el hook de servicios existente
  const { servicesQuery } = useServicesQuery();

  // 🔹 GET: Obtener tareas del contrato agrupadas por servicio
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

  // 🔹 GET: Obtener TODAS las definiciones de tareas
  const tasksDefinitionsQuery = useQuery({
    queryKey: ["tasksDefinitions"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/Tareas");
      return data;
    },
  });

  // 🔹 Crear mapa de definiciones de tareas por ID
  const tasksMap =
    tasksDefinitionsQuery.data?.reduce((acc, task) => {
      acc[task.id] = task;
      return acc;
    }, {}) || {};

  // 🔹 Crear mapa de servicios por ID desde el hook
  const servicesMap =
    servicesQuery.data?.reduce((acc, service) => {
      acc[service.id] = service.name; // ← Usar 'name' porque el hook ya mapea 'nombre' a 'name'
      return acc;
    }, {}) || {};

  // 🔹 Combinar datos: Tareas del contrato + Definiciones + Servicios
  const services =
    contractTasksQuery.data?.map((service) => {
      return {
        serviceId: service.id_Servicio,
        title:
          servicesMap[service.id_Servicio] || `Service ${service.id_Servicio}`,
        tasks: service.tasks
          .filter((taskContract) => taskContract.estado) // Solo tareas activas
          .map((taskContract) => {
            const taskDef = tasksMap[taskContract.id_Tarea];

            return {
              // IDs
              taskId: taskContract.id,
              taskDefinitionId: taskContract.id_Tarea,
              contractId: taskContract.id_Contrato,

              // Info de la tarea
              label: taskDef?.nombre || `Task ${taskContract.id_Tarea}`,
              status: taskContract.id_Estado, // 1: Pending, 2: Completed, 3: Returned, 4: Accepted

              // Form y datos
              form: parseTaskForm(taskDef?.descripcion),
              savedData: parseJSON(taskContract.json_Respuesta),

              // Metadata
              observations: taskContract.observaciones,
              responsible: taskContract.id_UsuarioResponsable,
              isActive: taskContract.estado,
              isInternal: taskDef?.esInterno || false,
            };
          }),
      };
    }) || [];

  // 🔹 UPDATE: Actualizar una tarea del contrato
  const updateTaskContract = useMutation({
    mutationFn: async ({ taskId, formData, newState }) => {
      // Primero obtener los datos actuales de la tarea
      const currentTask = services
        .flatMap((s) => s.tasks)
        .find((t) => t.taskId === taskId);

      if (!currentTask) {
        throw new Error(`Task ${taskId} not found`);
      }

      const payload = {
        id_Contrato: currentTask.contractId,
        id_Tarea: currentTask.taskDefinitionId,
        id_UsuarioResponsable: currentTask.responsible,
        id_Estado: newState || currentTask.status,
        estado: true,
        json_Respuesta: formData
          ? JSON.stringify(formData)
          : currentTask.savedData
          ? JSON.stringify(currentTask.savedData)
          : null,
        observaciones: currentTask.observations || "",
      };

      const { data } = await axiosClient.put(
        `/TareaContrato/${taskId}`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      // Invalidar queries para refrescar datos
      queryClient.invalidateQueries({
        queryKey: ["contractTasks", contractId],
      });
    },
  });

  // 🔹 Estados de carga y error
  const isLoading =
    contractTasksQuery.isLoading ||
    tasksDefinitionsQuery.isLoading ||
    servicesQuery.isLoading;

  const error =
    contractTasksQuery.error ||
    tasksDefinitionsQuery.error ||
    servicesQuery.error;

  return {
    services,
    isLoading,
    error,
    updateTaskContract,
    refetch: () => {
      contractTasksQuery.refetch();
      tasksDefinitionsQuery.refetch();
      servicesQuery.refetch();
    },
  };
};
