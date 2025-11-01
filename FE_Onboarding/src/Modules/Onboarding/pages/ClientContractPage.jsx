import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContractFlow } from "../../../Global/Context";
import { useTaskContractDetailQuery } from "../../../Modules/Admin/hooks";
import { DynamicForm } from "../components";
import styles from "./ClientContractPage.module.css";

export const ClientContractPage = () => {
  const { taskId } = useParams();
  const { setActiveTask } = useContractFlow();

  // 🔹 Lazy load: solo carga formulario de esta tarea
  const { taskDetail, isLoading, error, updateTaskContract } =
    useTaskContractDetailQuery(taskId);

  // Actualizar contexto cuando cargue
  useEffect(() => {
    if (taskDetail) {
      setActiveTask(taskDetail);
    }
  }, [taskDetail, setActiveTask]);

  const handleSubmit = async (formData) => {
    try {
      await updateTaskContract.mutateAsync({
        formData: formData,
        newState: 2, // Completed
      });
      alert("✅ Formulario enviado exitosamente");
    } catch (error) {
      console.error("Error guardando formulario:", error);
      alert("❌ Error al guardar el formulario");
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Cargando formulario...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        Error: {error.message}
      </div>
    );
  }

  if (!taskDetail?.form) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Esta tarea no tiene formulario disponible.
      </div>
    );
  }

  const isTaskAccepted = taskDetail.status === 4;
  const isTaskReturned = taskDetail.status === 3;
  const isTaskCompleted = taskDetail.status === 2;

  return (
    <div style={{ padding: "20px" }}>
      {isTaskAccepted && (
        <div className={styles.successBanner}>
          ✅ Esta tarea ha sido aprobada
        </div>
      )}

      {isTaskReturned && (
        <div className={styles.warningBanner}>
          ⚠️ Requiere correcciones
          {taskDetail.observations && (
            <div style={{ marginTop: "8px" }}>
              <strong>Observaciones:</strong> {taskDetail.observations}
            </div>
          )}
        </div>
      )}

      {isTaskCompleted && (
        <div className={styles.infoBanner}>⏳ En revisión</div>
      )}

      <h2>{taskDetail.label}</h2>

      <DynamicForm
        formData={taskDetail.form}
        onSubmit={handleSubmit}
        initialData={taskDetail.savedData}
        disabled={updateTaskContract.isLoading || isTaskAccepted}
      />

      {updateTaskContract.isLoading && (
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
