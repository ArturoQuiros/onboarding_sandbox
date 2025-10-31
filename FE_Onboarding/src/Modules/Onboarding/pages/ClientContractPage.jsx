import React, { useEffect, useState, useMemo } from "react"; // 💡 Importamos useMemo
import { useParams } from "react-router-dom";
import { useContractFlow } from "../../../Global/Context";
import { DynamicForm } from "../components";
import styles from "./ClientContractPage.module.css";

export const ClientContractPage = () => {
  const { serviceId, taskId } = useParams();
  const {
    services,
    setActiveService,
    setActiveTask,
    updateTaskContract,
    refetch,
  } = useContractFlow();

  // 1. Unificamos el estado, ya que taskForm es solo un campo de currentTask
  const [currentTask, setCurrentTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!services || services.length === 0) return;

    const service = services.find((s) => s.serviceId === Number(serviceId));
    const task = service?.tasks.find((t) => t.taskId === Number(taskId));

    if (!service || !task) return;

    // Solo actualizar si IDs difieren
    if (currentTask?.taskId !== task.taskId) {
      setActiveService(service);
      setActiveTask(task);
      setCurrentTask(task);
    }
  }, [
    serviceId,
    taskId,
    services,
    setActiveService,
    setActiveTask,
    currentTask?.taskId,
  ]);
  // 2. 💡 CORRECCIÓN CRÍTICA: Estabilizamos taskForm con useMemo.
  // La referencia de `taskForm` solo se actualizará cuando `currentTask` cambie.
  const taskForm = useMemo(() => {
    return currentTask?.form || null;
  }, [currentTask]);

  const handleSubmit = async (formData) => {
    if (!currentTask) return;

    setIsSubmitting(true);

    try {
      await updateTaskContract.mutateAsync({
        taskId: currentTask.taskId,
        formData: formData,
        newState: 2, // 2 = Completed (enviado para revisión)
      });

      alert("✅ Formulario enviado exitosamente");

      // Refrescar datos del contrato
      await refetch();
    } catch (error) {
      console.error("Error guardando formulario:", error);
      alert("❌ Error al guardar el formulario. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔹 Estados de la tarea (simplificamos usando currentTask)
  const isTaskAccepted = currentTask?.status === 4; // Accepted
  const isTaskReturned = currentTask?.status === 3; // Returned
  const isTaskCompleted = currentTask?.status === 2; // Completed (en revisión)
  // const isTaskPending = currentTask?.status === 1; // Pending (no usado en el return)

  if (!taskForm) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        {currentTask ? (
          <div>
            <p>Esta tarea no tiene un formulario disponible.</p>
            <p>
              <strong>{currentTask.label}</strong>
            </p>
            {currentTask.observations && (
              <p style={{ marginTop: "10px", color: "#666" }}>
                Observaciones: {currentTask.observations}
              </p>
            )}
          </div>
        ) : (
          <p>Cargando formulario...</p>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Banner de estado Aceptado */}
      {isTaskAccepted && (
        <div className={styles.successBanner}>
          ✅ Esta tarea ha sido aprobada por el equipo
        </div>
      )}

      {/* Banner de estado Devuelto */}
      {isTaskReturned && (
        <div className={styles.warningBanner}>
          ⚠️ Esta tarea requiere correcciones
          {currentTask.observations && (
            <div style={{ marginTop: "8px", fontSize: "14px" }}>
              <strong>Observaciones:</strong> {currentTask.observations}
            </div>
          )}
        </div>
      )}

      {/* Banner de estado En Revisión */}
      {isTaskCompleted && (
        <div className={styles.infoBanner}>
          ⏳ Esta tarea está en revisión por el equipo
        </div>
      )}

      {/* Título de la tarea */}
      <h2 style={{ marginBottom: "20px" }}>{currentTask?.label}</h2>

      {/* Formulario dinámico */}
      <DynamicForm
        formData={taskForm} // Propiedad estable gracias a useMemo
        onSubmit={handleSubmit}
        initialData={currentTask?.savedData} // Pre-llenar con datos guardados
        disabled={isSubmitting || isTaskAccepted} // Deshabilitar si está enviando o aceptada
      />

      {/* Indicador de guardado */}
      {isSubmitting && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#333",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          Guardando...
        </div>
      )}
    </div>
  );
};
