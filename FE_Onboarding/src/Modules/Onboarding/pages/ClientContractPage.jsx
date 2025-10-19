import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContractFlow } from "../../../Global/Context";
import { DynamicForm } from "../components"; // Ajusta la ruta según tu estructura

export const ClientContractPage = () => {
  const { serviceId, taskId } = useParams();
  const { services, setActiveService, setActiveTask } = useContractFlow();
  const [taskForm, setTaskForm] = useState(null);

  useEffect(() => {
    const service = services.find((s) => s.serviceId === Number(serviceId));
    const task = service?.tasks.find((t) => t.taskId === Number(taskId));

    if (service && task) {
      setActiveService(service);
      setActiveTask(task);
      setTaskForm(task.form); // Obtenemos el form del mock
    }
  }, [serviceId, taskId, services, setActiveService, setActiveTask]);

  const handleSubmit = (data) => {
    console.log("Formulario enviado:", data);
    alert("Formulario enviado (ver consola)");
  };

  if (!taskForm) return <div>Cargando formulario...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <DynamicForm formData={taskForm} onSubmit={handleSubmit} />
    </div>
  );
};
