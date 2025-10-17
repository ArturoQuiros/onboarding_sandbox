import React, { useState } from "react";
import "./CustomerHomeDashboard.module.css";

export const CustomerHomeDashboard = () => {
  // Datos simulados
  const [tasks, setTasks] = useState([
    {
      id: 1,
      nombre: "Formulario de apertura",
      estado: "Pendiente",
      responsable: "No asignado",
    },
    {
      id: 2,
      nombre: "Validación de documentos",
      estado: "En Progreso",
      responsable: "Carlos Q.",
    },
    {
      id: 3,
      nombre: "Firma de contrato",
      estado: "Completada",
      responsable: "Ana P.",
    },
  ]);

  // Lista de usuarios disponibles para asignación
  const users = ["No asignado", "Carlos Q.", "Ana P.", "Luis R."];

  const handleAssign = (taskId, newUser) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, responsable: newUser } : t))
    );
  };

  return (
    <div className="dashboardContainer">
      <h2>Dashboard de Tareas</h2>

      {/* Resumen rápido de estado */}
      <div className="taskSummary">
        <div>
          Pendientes: {tasks.filter((t) => t.estado === "Pendiente").length}
        </div>
        <div>
          En Progreso: {tasks.filter((t) => t.estado === "En Progreso").length}
        </div>
        <div>
          Completadas: {tasks.filter((t) => t.estado === "Completada").length}
        </div>
      </div>

      {/* Lista de tareas */}
      <table className="taskTable">
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Estado</th>
            <th>Responsable</th>
            <th>Asignar</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.nombre}</td>
              <td>{task.estado}</td>
              <td>{task.responsable}</td>
              <td>
                <select
                  value={task.responsable}
                  onChange={(e) => handleAssign(task.id, e.target.value)}
                >
                  {users.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
