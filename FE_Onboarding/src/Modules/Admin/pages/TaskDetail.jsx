// src/Modules/Admin/pages/TaskDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TaskDetail = () => {
  const { serviceId, taskId } = useParams();
  const isNew = taskId === "new"; // 👈 clave

  const [task, setTask] = useState(
    isNew
      ? { name: "", form: "{}" } // valores por defecto para crear
      : null
  );

  useEffect(() => {
    if (!isNew) {
      // simulación de carga de tarea
      console.log("🔍 Buscando tarea existente:", taskId);
      const MOCK_TASKS = [
        { id: 1, name: "Solicitud del servicio", form: "{}" },
        { id: 2, name: "Formulario de constitución", form: "{}" },
      ];
      const found = MOCK_TASKS.find((t) => t.id === parseInt(taskId));
      if (found) {
        setTask(found);
      } else {
        console.warn("⚠️ Tarea no encontrada");
      }
    }
  }, [isNew, taskId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{isNew ? "Nueva Tarea" : `Editar Tarea #${taskId}`}</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "500px",
        }}
      >
        <label>
          Nombre:
          <input
            type="text"
            value={task?.name || ""}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
            style={{ width: "100%", padding: "8px" }}
          />
        </label>

        <label>
          Form JSON:
          <textarea
            rows={10}
            value={task?.form || ""}
            onChange={(e) => setTask({ ...task, form: e.target.value })}
            style={{ width: "100%", padding: "8px", fontFamily: "monospace" }}
          />
        </label>

        <button
          onClick={() => {
            if (isNew) {
              console.log("🆕 Crear tarea:", task);
            } else {
              console.log("💾 Actualizar tarea:", task);
            }
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#e81a3b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {isNew ? "Crear" : "Guardar Cambios"}
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;
