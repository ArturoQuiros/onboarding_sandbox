// src/Modules/Admin/pages/Tasks.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { FaTasks } from "react-icons/fa"; // Ícono para Tareas

// ----------------------------------------------------------------------
// 1. DATOS DE PRUEBA (MOCK DATA)
// ----------------------------------------------------------------------
const MOCK_TASKS = [
  {
    id: 1,
    name: "Registro de Usuario",
    form: {
      type: "user_signup",
      fields: [
        { key: "username", label: "Nombre de Usuario", type: "text" },
        { key: "email", label: "Correo Electrónico", type: "email" },
        { key: "password", label: "Contraseña", type: "password" },
      ],
    },
  },
  {
    id: 2,
    name: "Solicitud de Vacaciones",
    form: {
      type: "vacation_request",
      fields: [
        { key: "start_date", label: "Fecha de Inicio", type: "date" },
        { key: "end_date", label: "Fecha de Fin", type: "date" },
        { key: "reason", label: "Motivo", type: "textarea" },
      ],
    },
  },
];

// ----------------------------------------------------------------------
// 2. CUSTOM HOOK SIMULADO (SIMULA REACT QUERY PARA CRUD)
// ----------------------------------------------------------------------
const useTasksQueryMock = (mockData) => {
  const [data, setData] = useState(mockData);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getTasks = () => ({
    isLoading,
    isError,
    data,
  });

  const createItem = {
    mutateAsync: async (newItem) => {
      const newId = Math.max(...data.map((t) => t.id), 0) + 1;
      // Parsea el JSON string del formulario antes de guardar en el estado
      const taskWithId = {
        ...newItem,
        id: newId,
        form: JSON.parse(newItem.form),
      };
      setData((prev) => [...prev, taskWithId]);
      return taskWithId;
    },
  };

  const updateItem = {
    mutateAsync: async (updatedItem) => {
      // Parsea el JSON string del formulario antes de actualizar en el estado
      const parsedItem = { ...updatedItem, form: JSON.parse(updatedItem.form) };
      setData((prev) =>
        prev.map((t) => (t.id === updatedItem.id ? parsedItem : t))
      );
      return parsedItem;
    },
  };

  const deleteItem = {
    mutateAsync: async (itemId) => {
      setData((prev) => prev.filter((t) => t.id !== itemId));
      return itemId;
    },
  };

  return {
    tasksQuery: getTasks(),
    createTask: createItem,
    updateTask: updateItem,
    deleteTask: deleteItem,
  };
};

// ----------------------------------------------------------------------
// 3. COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------
const Tasks = () => {
  const { setEntityIcon } = useContext(UIContext);

  const { tasksQuery, createTask, updateTask, deleteTask } =
    useTasksQueryMock(MOCK_TASKS);

  useEffect(() => {
    setEntityIcon(<FaTasks />);
  }, [setEntityIcon]);

  // ✅ Definición de campos con useMemo
  const taskFields = useMemo(
    () => [
      { key: "id", labelKey: "tasks.table.id", type: "text", editable: false },
      { key: "name", labelKey: "tasks.table.name", type: "text" },
      {
        key: "form",
        labelKey: "tasks.table.form_json",
        type: "textarea",
        // 🔧 Convierte objeto a string formateado para edición
        // Debe retornar un objeto con TODAS las propiedades
        transformForEdit: (item) => ({
          id: item.id,
          name: item.name,
          form: JSON.stringify(item.form, null, 2),
        }),
        // ✅ Oculta esta columna en la tabla (no se muestra)
        isHidden: true,
      },
    ],
    []
  );

  // ✅ Reglas de validación con useMemo
  const taskValidations = useMemo(
    () => ({
      name: (value) => {
        if (!value) return "El nombre de la tarea es obligatorio";
        if (value.length < 5) return "Debe tener al menos 5 caracteres";
        return null;
      },
      form: (value) => {
        if (!value) return "El JSON del formulario es obligatorio";
        try {
          JSON.parse(value); // Valida el formato JSON
        } catch (e) {
          return "Debe ser un formato JSON válido";
        }
        return null;
      },
    }),
    []
  );

  // ✅ Returns condicionales
  if (tasksQuery.isLoading) return <p>Cargando tareas...</p>;
  if (tasksQuery.isError) return <p>Error cargando tareas</p>;

  // ✅ Renderizado del CrudDashboard
  return (
    <CrudDashboard
      entityName="tasks"
      fields={taskFields}
      // ✅ Pasa los datos originales sin modificar
      getItems={() => tasksQuery.data ?? []}
      createItem={createTask.mutateAsync}
      updateItem={updateTask.mutateAsync}
      deleteItem={deleteTask.mutateAsync}
      validations={taskValidations}
    />
  );
};

export default Tasks;
