// src/Modules/Admin/components/TaskDetailDashboard.jsx
import React, { useState } from "react";
import styles from "./TaskDetailDashboard.module.css";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export const TaskDetailDashboard = ({ task, onSave, isNew }) => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const [name, setName] = useState(task?.name || "");
  const [form, setForm] = useState(task?.form || "{}");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("El nombre de la tarea es obligatorio");
      return;
    }

    // Validar JSON antes de guardar
    try {
      JSON.parse(form);
    } catch (error) {
      toast.error("El contenido del formulario no es un JSON válido");
      return;
    }

    const updatedTask = {
      ...task,
      name,
      form,
      serviceId: Number(serviceId),
    };

    await onSave(updatedTask);
  };

  const handleCancel = () => {
    navigate(`/admin/services/${serviceId}/tasks`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{isNew ? "Nueva tarea" : "Editar tarea"}</h2>

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
          ></textarea>
        </div>

        <div className={styles.buttons}>
          <button type="submit" className={styles.saveButton}>
            <FaSave /> Guardar
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            <FaArrowLeft /> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
