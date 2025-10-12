import React, { useState } from "react";
import styles from "./TaskDetailDashboard.module.css";
import toast from "react-hot-toast";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const TaskDetailDashboard = ({ task, onSave, isNew }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(task?.name || "");
  const [form, setForm] = useState(task?.form || "{}");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("El nombre de la tarea es obligatorio");
      return;
    }

    // Validar JSON
    try {
      JSON.parse(form);
    } catch {
      toast.error("El contenido del formulario no es un JSON válido");
      return;
    }

    const updatedTask = {
      ...task,
      name,
      form,
    };

    await onSave(updatedTask);
  };

  const handleCancel = () => {
    navigate(`/admin/services/${task.serviceId}/tasks`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isNew ? "Nueva tarea" : `Editar tarea #${task?.id ?? ""}`}
      </h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Nombre de la tarea:
          </label>
          <input
            id="name"
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ejemplo: Solicitud de servicio"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="form" className={styles.label}>
            Contenido del formulario (JSON):
          </label>
          <textarea
            id="form"
            className={styles.textarea}
            rows={12}
            value={form}
            onChange={(e) => setForm(e.target.value)}
            placeholder='{ "field1": "valor1", "field2": "valor2" }'
          />
        </div>

        <div className={styles.buttons}>
          <button type="submit" className={styles.saveButton}>
            <FaSave /> {isNew ? "Crear" : "Guardar Cambios"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            <FaArrowLeft /> Volver
          </button>
        </div>
      </form>
    </div>
  );
};
