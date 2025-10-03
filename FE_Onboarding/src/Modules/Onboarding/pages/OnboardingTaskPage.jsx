// src/Modules/Contracts/TaskFlow/pages/OnboardingTaskPage.jsx

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
// import axiosClient from "../../../Api/axiosClient"; // NO SE NECESITA
import { TaskFlowLayout } from "../layouts";

// MOCK DATA (Necesaria para desarrollo)
import { MOCK_TASKS } from "../../../Global/data";

export const OnboardingTaskPage = () => {
  const { contractId, serviceId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("global");

  // Estado principal del flujo
  const [tasks, setTasks] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // -------------------------------------------------------------------------
  // LÓGICA DE BÚSQUEDA Y CONTEXTO (No se toca)
  // -------------------------------------------------------------------------

  /**
   * Devuelve información de contexto sobre la tarea activa, siguiente y anterior.
   */
  const findTaskContext = useCallback(
    (currentId) => {
      const allSubtasks = tasks.flatMap((s) => s.tasks);
      const currentIndex = allSubtasks.findIndex((t) => t.id === currentId);

      return {
        currentIndex,
        currentTask: allSubtasks[currentIndex],
        nextTask: allSubtasks[currentIndex + 1],
        prevTask: allSubtasks[currentIndex - 1],
      };
    },
    [tasks]
  );

  // Determinar la clave del componente activo y la data inicial (No se toca)
  const activeContext = useMemo(() => {
    const { currentTask } = findTaskContext(activeTaskId);
    if (!currentTask) return { componentKey: null, initialData: null };

    return {
      componentKey: currentTask.component,
      initialData: currentTask.data || {},
    };
  }, [activeTaskId, findTaskContext]);

  // -------------------------------------------------------------------------
  // LLAMADAS AL API (Carga Inicial) - 🎯 MODIFICADO PARA USAR SOLO MOCK
  // -------------------------------------------------------------------------

  /** Carga la estructura de tareas del servicio, usando MOCK por ahora. */
  const loadTasks = useCallback(() => {
    setIsLoading(true);

    // --- LÓGICA MOCK FORZADA ---
    const loadedTasks = MOCK_TASKS;
    setTasks(loadedTasks);

    // Encuentra la primera tarea que no esté 'complete' para establecerla como activa
    const allSubtasks = loadedTasks.flatMap((s) => s.tasks);
    const firstActive =
      allSubtasks.find((t) => t.status !== "complete") || allSubtasks[0];

    if (firstActive) {
      setActiveTaskId(firstActive.id);
    } else {
      // En caso de que el mock esté vacío, evitamos que activeTaskId sea null.
      setActiveTaskId(null);
    }
    // --- FIN DE LÓGICA MOCK FORZADA ---

    // El setIsLoading(false) va al final de la ejecución síncrona
    setIsLoading(false);
  }, []); // Sin dependencias de API (contractId, serviceId, t)

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // -------------------------------------------------------------------------
  // HANDLERS DE NAVEGACIÓN (El Corazón del Flujo) - 🎯 MODIFICADO PARA NO USAR API
  // -------------------------------------------------------------------------

  /** Guarda los datos del formulario de la tarea activa y avanza a la siguiente. */
  const handleNext = async (formData) => {
    if (!activeTaskId || isSaving) return;

    const { currentIndex, currentTask, nextTask } =
      findTaskContext(activeTaskId);
    if (currentIndex === -1 || !currentTask) return;

    // ⚠️ COMENTAMOS LA SECCIÓN DE LLAMADA AL API PARA PERMITIR LA NAVEGACIÓN LOCAL
    /*
    setIsSaving(true);
    try {
      const payload = { taskId: activeTaskId, contractId: contractId, data: formData, status: "complete" };
      
      await toast.promise(
        axiosClient.post(`/tasks/${activeTaskId}/save`, payload),
        { loading: t("common.savingData"), success: t("common.savedSuccess"), error: t("common.saveError") }
      );
    */

    // 🎯 SIMULAMOS LA ACTUALIZACIÓN LOCAL INMEDIATA
    // Esto ejecuta la navegación y el cambio de estado (active/complete)

    setTasks((prevTasks) => {
      const newTasks = JSON.parse(JSON.stringify(prevTasks));

      // 1. Marca la tarea actual como 'complete' y actualiza sus datos
      const current = newTasks
        .flatMap((s) => s.tasks)
        .find((t) => t.id === activeTaskId);
      if (current) {
        current.status = "complete";
        current.data = formData;
      }

      // 2. Marca la siguiente tarea como 'active' (si existe)
      if (nextTask) {
        const next = newTasks
          .flatMap((s) => s.tasks)
          .find((t) => t.id === nextTask.id);
        if (next) {
          next.status = "active";
          setActiveTaskId(next.id);
        }
      } else {
        // Flujo Completado!
        toast.success(t("common.flowCompleted"));
        // Navegar de vuelta al Landing Page del servicio
        navigate(`/contracts/${contractId}/service/${serviceId}`);
        setActiveTaskId(null);
      }

      return newTasks;
    });

    // ⚠️ EL FINALLY Y EL CATCH DEL API TAMBIÉN SE COMENTAN.
    /*
    } catch (error) {
      console.error("Error saving task data:", error);
    } finally {
      setIsSaving(false);
    }
    */
  };

  /** Navega a la tarea anterior. No hay llamada al API, solo cambio de estado. */
  // handleBack no requiere cambios ya que no usa API.
  const handleBack = () => {
    if (isSaving) return;

    const { currentIndex, prevTask } = findTaskContext(activeTaskId);
    if (currentIndex > 0 && prevTask) {
      setTasks((prevTasks) => {
        const newTasks = JSON.parse(JSON.stringify(prevTasks));

        const current = newTasks
          .flatMap((s) => s.tasks)
          .find((t) => t.id === activeTaskId);
        if (current && current.status !== "complete") {
          current.status = "pending";
        }

        const prev = newTasks
          .flatMap((s) => s.tasks)
          .find((t) => t.id === prevTask.id);
        if (prev) {
          prev.status = "active";
          setActiveTaskId(prev.id);
        }
        return newTasks;
      });
    }
  };

  // handleTaskSelect no requiere cambios ya que no usa API.
  const handleTaskSelect = (taskId) => {
    if (isSaving) return;
    const allSubtasks = tasks.flatMap((s) => s.tasks);
    const selectedTask = allSubtasks.find((t) => t.id === taskId);

    if (selectedTask && selectedTask.status !== "complete") {
      setActiveTaskId(taskId);
    } else if (selectedTask && selectedTask.status === "complete") {
      setActiveTaskId(taskId);
    }
  };

  // -------------------------------------------------------------------------
  // RENDERIZADO
  // -------------------------------------------------------------------------

  const { currentIndex } = findTaskContext(activeTaskId);

  if (isLoading) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        {t("common.loadingFlow")}
      </div>
    );
  }

  if (!tasks.length || !activeTaskId) {
    return (
      <div style={{ padding: "50px", textAlign: "center", color: "gray" }}>
        {t("common.noActiveTask")}
      </div>
    );
  }

  return (
    <TaskFlowLayout
      tasks={tasks}
      activeTaskId={activeTaskId}
      // Props para el DynamicFormRenderer
      activeComponentKey={activeContext.componentKey}
      initialData={activeContext.initialData}
      isSaving={isSaving}
      // Props para la navegación
      onNext={handleNext}
      onBack={handleBack}
      canGoBack={currentIndex > 0}
      onTaskSelect={handleTaskSelect}
    />
  );
};
