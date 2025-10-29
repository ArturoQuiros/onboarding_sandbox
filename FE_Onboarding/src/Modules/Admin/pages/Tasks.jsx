// src/Modules/Admin/pages/Tasks.jsx
import React, { useContext, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { FaTasks } from "react-icons/fa";
import { useTasksQuery } from "../hooks/useTasksQuery";
import { useTranslation } from "react-i18next";

const Tasks = () => {
  const { t } = useTranslation("global");
  const { setEntityIcon } = useContext(UIContext);
  const { serviceId } = useParams();
  const numericServiceId = Number(serviceId);

  if (!numericServiceId) {
    return (
      <div className="flex items-center justify-center h-64 text-center">
        <p className="text-red-600 font-semibold mb-2">
          Error: no se encontró el ID del servicio en la URL
        </p>
      </div>
    );
  }

  const { tasksQuery, createTask, updateTask, deleteTask } =
    useTasksQuery(numericServiceId);

  useEffect(() => {
    setEntityIcon(<FaTasks />);
  }, [setEntityIcon]);

  // Campos del formulario y tabla
  const taskFields = useMemo(
    () => [
      {
        key: "id",
        labelKey: "tasks.table.id",
        type: "text",
        isReadOnly: true,
      },
      {
        key: "name",
        labelKey: "tasks.table.name",
        type: "text",
        validation: { required: true },
      },
      {
        key: "description",
        labelKey: "tasks.table.description",
        type: "textarea",
        isTableVisible: false,
        validation: { required: true },
        rows: 10,
      },
      {
        key: "isInternal",
        labelKey: "tasks.table.is_internal",
        type: "radio",
        options: [
          { label: t("common.yes"), value: "true" },
          { label: t("common.no"), value: "false" },
        ],
        defaultValue: false,
        transformForDisplay: (value) => {
          // Normalizar el valor a booleano
          const boolValue = value === true || value === "true" || value === 1;
          return boolValue ? t("common.yes") : t("common.no");
        },
      },
    ],
    [t]
  );

  // Validaciones
  const taskValidations = useMemo(
    () => ({
      name: (value) => {
        if (!value) return t("validations.name_required");
        if (value.length < 3)
          return t("validations.name_min_length", { min: 3 });
        if (value.length > 100)
          return t("validations.name_max_length", { max: 100 });
        return null;
      },
      description: (value) => {
        if (!value) return t("validations.description_required");
        try {
          JSON.parse(value);
        } catch {
          return t("validations.json_invalid");
        }
        return null;
      },
    }),
    [t]
  );

  // Wrapper para crear/actualizar - simplificado
  const handleMutation = useCallback(
    async (task) => {
      // El hook useTasksQuery ya maneja toda la transformación
      if (task.id) {
        return updateTask.mutateAsync(task);
      } else {
        return createTask.mutateAsync(task);
      }
    },
    [createTask, updateTask]
  );

  if (tasksQuery.isLoading) return <div>{t("common.loading")}</div>;

  if (tasksQuery.isError)
    return (
      <div>
        {t("common.loadError")}
        {tasksQuery.error && <p>{tasksQuery.error.message}</p>}
      </div>
    );

  // Los datos ya vienen transformados de useTasksQuery
  return (
    <CrudDashboard
      entityName="tasks"
      fields={taskFields}
      getItems={() => tasksQuery.data ?? []}
      createItem={handleMutation}
      updateItem={handleMutation}
      deleteItem={deleteTask.mutateAsync}
      validations={taskValidations}
      initialFormValues={{
        name: "",
        description: "{}",
        isInternal: false,
      }}
    />
  );
};

export default Tasks;
