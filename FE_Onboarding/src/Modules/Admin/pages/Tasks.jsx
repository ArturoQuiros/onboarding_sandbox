// src/Modules/Admin/pages/TasksPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { TasksDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { FaTasks } from "react-icons/fa";

// Datos de prueba
const MOCK_TASKS = [
  {
    id: 1,
    name: "Solicitud del servicio",
    form: JSON.stringify({ field1: "valor1", field2: "valor2" }),
  },
  {
    id: 2,
    name: "Formulario de constitución",
    form: JSON.stringify({ fieldA: "datoA", fieldB: "datoB" }),
  },
];

const TasksPage = () => {
  const { setEntityIcon } = useContext(UIContext);

  // Estado de tareas y siguiente ID para crear nuevos
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [nextId, setNextId] = useState(3);

  // Establece el ícono para la página
  useEffect(() => {
    setEntityIcon(<FaTasks />);
  }, [setEntityIcon]);

  // --- Operaciones CRUD Simuladas ---
  const getTasks = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return tasks;
  };

  const createTask = async (task) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newTask = { ...task, id: nextId };
    setTasks((prev) => [...prev, newTask]);
    setNextId((prev) => prev + 1);
    return newTask;
  };

  const updateTask = async (updatedTask) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let updated = {};
    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === updatedTask.id);
      if (index === -1) throw new Error("Tarea no encontrada para actualizar");
      const newTasks = [...prev];
      updated = { ...newTasks[index], ...updatedTask };
      newTasks[index] = updated;
      return newTasks;
    });
    return updated;
  };

  const deleteTask = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setTasks((prev) => prev.filter((t) => t.id !== id));
    return true;
  };

  // --- Campos para TasksDashboard ---
  const taskFields = [
    {
      key: "id",
      labelKey: "tasks.id",
      isTableVisible: false,
      isReadOnly: true,
    },
    {
      key: "name",
      labelKey: "tasks.name",
      type: "text",
    },
    {
      key: "form",
      labelKey: "tasks.form",
      type: "textarea",
      isTableVisible: false,
    },
  ];

  // --- Validaciones ---
  const taskValidations = {
    name: (value) => (!value ? "Name is required" : null),
    form: (value) => (!value ? "Form JSON is required" : null),
  };

  return (
    <TasksDashboard
      entityName="tasks"
      fields={taskFields}
      getItems={getTasks}
      createItem={createTask}
      updateItem={updateTask}
      deleteItem={deleteTask}
      validations={taskValidations}
    />
  );
};

export default TasksPage;
