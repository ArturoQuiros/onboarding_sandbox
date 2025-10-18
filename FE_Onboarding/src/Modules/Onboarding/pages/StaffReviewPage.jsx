// src/Modules/Onboarding/pages/StaffReviewPage.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Asumo que tu contexto se llama ContractFlowContext
import { useContractFlow } from "../../../Global/Context";
import { StaffReviewControls, DynamicFormReadOnly } from "../components";

export const StaffReviewPage = () => {
  const { contractId, serviceId, taskId } = useParams();
  // ✅ Asumo que tu contexto ya calcula activeTask y activeService basado en la URL
  const { activeTask, activeService, updateTaskStatus, addTaskObservation } =
    useContractFlow();

  // Estado local para la revisión (puede inicializarse con valores existentes de la tarea)
  const [status, setStatus] = useState(
    activeTask?.status || "Pendiente de revisión"
  );
  const [observation, setObservation] = useState(activeTask?.observation || "");

  useEffect(() => {
    // 💡 Opcional: Si el contexto no calcula activeTask automáticamente,
    // aquí iría la lógica de búsqueda y seteo del contexto, similar a ClientContractPage.

    // Sincronizar estado local al cargar la tarea
    if (activeTask) {
      setStatus(activeTask.status);
      setObservation(activeTask.observation || "");
    }
  }, [activeTask]);

  // Lógica para manejar la actualización de la tarea
  const handleUpdateTask = () => {
    // 1. Lógica para llamar al API y guardar (usando las funciones del contexto)

    // Simulación de la actualización:
    // updateTaskStatus(taskId, status); // Actualiza el estado
    // addTaskObservation(taskId, observation); // Guarda la observación

    console.log(`[STAFF] Actualizando Tarea ${taskId}:`);
    console.log(`Nuevo Estado: ${status}`);
    console.log(`Observación: ${observation}`);

    // Aquí iría el `toast.success('Tarea actualizada')` después del API call exitoso
    alert("Revisión y estado guardados.");
  };

  if (!activeTask || !activeService) {
    return <div>Cargando detalles de la tarea...</div>;
  }

  // 💡 Asumo que el formulario completado está en activeTask.submittedForm
  const submittedForm = activeTask.submittedForm;

  return (
    // Contenedor principal sin clases CSS
    <div style={{ padding: "20px" }}>
      <h1>Revisión de Tarea: {activeTask.label}</h1>
      <p>
        Servicio: {activeService.title} (Contrato #{contractId})
      </p>

      {/* 1. CONTROLES DE REVISIÓN (Maestro) */}
      {/* StaffReviewControls sí tiene estilos internos para su presentación */}
      <StaffReviewControls
        status={status}
        observation={observation}
        onStatusChange={setStatus}
        onObservationChange={setObservation}
        onSave={handleUpdateTask}
      />

      {/* 2. FORMULARIO EN MODO SOLO LECTURA (Detalle) */}
      <div style={{ marginTop: "30px", padding: "10px" }}>
        <h2>Contenido Enviado por el Cliente</h2>
        {submittedForm ? (
          <DynamicFormReadOnly formData={submittedForm} />
        ) : (
          <div>El cliente aún no ha enviado el formulario para esta tarea.</div>
        )}
      </div>
    </div>
  );
};
