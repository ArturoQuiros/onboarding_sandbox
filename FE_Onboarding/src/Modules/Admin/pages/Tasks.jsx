// src/Modules/Admin/pages/TasksPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { TasksDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { FaTasks } from "react-icons/fa";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// Datos de prueba
const MOCK_TASKS = [
  {
    id: 1,
    serviceId: 1,
    name: "Solicitud del servicio",
    form: JSON.stringify({ field1: "valor1" }),
  },
  {
    id: 2,
    serviceId: 1,
    name: "Formulario de constitución",
    form: JSON.stringify({ fieldA: "datoA" }),
  },
];

const TasksPage = () => {
  const { setEntityIcon } = useContext(UIContext);
  const { serviceId } = useParams(); // <-- obtener el serviceId de la ruta

  // Estado de tareas y siguiente ID
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [nextId, setNextId] = useState(3);

  // Establece el ícono para la página
  useEffect(() => {
    setEntityIcon(<FaTasks />);
  }, [setEntityIcon]);

  // --- Operaciones CRUD simuladas ---
  const getTasks = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Filtrar tareas por serviceId
    return tasks.filter((t) => t.serviceId === Number(serviceId));
  };

  const createTask = async (task) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newTask = { ...task, id: nextId, serviceId: Number(serviceId) };
    setTasks((prev) => [...prev, newTask]);
    setNextId((prev) => prev + 1);
    toast.success("Tarea creada");
    return newTask;
  };

  const updateTask = async (updatedTask) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let updated = {};
    setTasks((prev) => {
      const index = prev.findIndex(
        (t) => t.id === updatedTask.id && t.serviceId === Number(serviceId)
      );
      if (index === -1) throw new Error("Tarea no encontrada");
      const newTasks = [...prev];
      updated = { ...newTasks[index], ...updatedTask };
      newTasks[index] = updated;
      return newTasks;
    });
    toast.success("Tarea actualizada");
    return updated;
  };

  const deleteTask = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setTasks((prev) =>
      prev.filter((t) => t.id !== id || t.serviceId !== Number(serviceId))
    );
    toast.success("Tarea eliminada");
    return true;
  };

  // --- Campos para el Dashboard ---
  const taskFields = [
    {
      key: "id",
      labelKey: "tasks.id",
      isTableVisible: false,
      isReadOnly: true,
    },
    { key: "name", labelKey: "tasks.name", type: "text" },
    {
      key: "form",
      labelKey: "tasks.form",
      type: "textarea",
      isTableVisible: false,
    },
  ];

  return (
    <TasksDashboard
      entityName="tasks"
      fields={taskFields}
      getItems={getTasks}
      createItem={createTask}
      updateItem={updateTask}
      deleteItem={deleteTask}
      serviceId={serviceId} // <-- pasar prop al Dashboard
    />
  );
};

export default TasksPage;
