import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TaskDetailDashboard } from "../components/TaskDetailDashboard";

const TaskDetail = ({ tasks, onSave }) => {
  const { serviceId, taskId } = useParams();
  const isNew = taskId === "new";

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(!isNew);

  // 🔹 Solo cargamos tarea si NO es nueva
  useEffect(() => {
    if (isNew) {
      setTask({ name: "", form: "{}", serviceId: Number(serviceId) });
      setLoading(false);
      return;
    }

    const fetchTask = async () => {
      setLoading(true);
      // Buscar tarea dentro de tasks (props desde TasksPage)
      const found = tasks?.find((t) => t.id === Number(taskId));

      if (found) {
        setTask(found);
      } else {
        console.warn("⚠️ Tarea no encontrada, creando vacía");
        setTask({ name: "", form: "{}", serviceId: Number(serviceId) });
      }

      setLoading(false);
    };

    fetchTask();
  }, [isNew, taskId, tasks, serviceId]);

  if (loading) return <p style={{ padding: "2rem" }}>Cargando tarea...</p>;

  return <TaskDetailDashboard task={task} onSave={onSave} isNew={isNew} />;
};

export default TaskDetail;
