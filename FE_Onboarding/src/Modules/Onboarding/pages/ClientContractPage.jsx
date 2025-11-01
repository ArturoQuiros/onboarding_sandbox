import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContractFlow } from "../../../Global/Context";
import { useTaskContractDetailQuery } from "../../../Modules/Admin/hooks";
import { DynamicForm } from "../components";

export const ClientContractPage = () => {
  const { taskId } = useParams();
  const { setActiveTask } = useContractFlow();

  const { taskDetail, isLoading, error, updateTaskContract } =
    useTaskContractDetailQuery(taskId);

  useEffect(() => {
    if (taskDetail) {
      setActiveTask(taskDetail);
    }
  }, [taskDetail, setActiveTask]);

  const handleSubmit = async (formData) => {
    try {
      await updateTaskContract.mutateAsync({
        formData: formData,
        newState: 2,
      });
      alert("✅ Form submitted successfully");
    } catch (error) {
      alert("❌ Error saving form");
    }
  };

  // 🔹 Loading state
  if (isLoading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Loading form...
      </div>
    );
  }

  // 🔹 Error state
  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        <h3>Error loading task</h3>
        <p>{error?.message || "Unknown error"}</p>
      </div>
    );
  }

  // 🔹 No task detail
  if (!taskDetail) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>Task not found</div>
    );
  }

  // 🔹 No form
  if (!taskDetail.form) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        This task has no form available.
        <br />
        <small>Task ID: {taskId}</small>
      </div>
    );
  }

  const isTaskAccepted = taskDetail.status === 4;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>{taskDetail.label || "Form"}</h2>

      <DynamicForm
        formData={taskDetail.form}
        onSubmit={handleSubmit}
        initialData={taskDetail.savedData || null}
        disabled={updateTaskContract.isLoading || isTaskAccepted}
        taskStatus={taskDetail.status}
        taskObservations={taskDetail.observations || ""}
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
          Saving...
        </div>
      )}
    </div>
  );
};
