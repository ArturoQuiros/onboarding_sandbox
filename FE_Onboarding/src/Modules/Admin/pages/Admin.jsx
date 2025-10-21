// src/Modules/Admin/pages/Admin.jsx

import React from "react";
import { useAuth } from "../../../Global/hooks";

/**
 * Página principal del panel de administración.
 */
const Admin = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div style={{ padding: "20px", color: "gray" }}>
        <h2>Cargando Datos de Usuario...</h2>
        <p>Verificando el perfil de usuario.</p>
      </div>
    );
  }

  // Desestructurar todos los datos del usuario
  const {
    id,
    nombre,
    email,
    puesto,
    id_Rol,
    id_Pais,
    estado,
    azure_AD_User_Id,
    fecha_Creacion,
    fecha_Modificacion,
  } = user;

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Panel de Administración</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Vista general de clientes actuales, estado de contratos y servicios
        contratados.
      </p>

      {/* Sección de Estado de Autenticación */}
      <div
        style={{
          border: "2px solid #4CAF50",
          padding: "20px",
          margin: "20px 0",
          borderRadius: "8px",
          backgroundColor: "#f9fff9",
        }}
      >
        <h2 style={{ marginTop: 0, color: "#4CAF50" }}>
          ✅ Estado de la Sesión
        </h2>
        <p>
          Estado de Autenticación:{" "}
          <strong style={{ color: "green" }}>AUTENTICADO</strong>
        </p>
        <p>
          <strong>Bienvenido:</strong> {nombre}
        </p>
      </div>

      {/* Sección de Información Personal */}
      <div
        style={{
          border: "1px solid #2196F3",
          padding: "20px",
          margin: "20px 0",
          borderRadius: "8px",
          backgroundColor: "#f5f9ff",
        }}
      >
        <h2 style={{ marginTop: 0, color: "#2196F3" }}>
          👤 Información Personal
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          <div>
            <p style={{ margin: "8px 0", color: "#666" }}>
              <strong>Nombre Completo:</strong>
            </p>
            <p style={{ margin: "0", fontSize: "18px" }}>{nombre}</p>
          </div>
          <div>
            <p style={{ margin: "8px 0", color: "#666" }}>
              <strong>Email:</strong>
            </p>
            <p style={{ margin: "0", fontSize: "18px" }}>{email}</p>
          </div>
          <div>
            <p style={{ margin: "8px 0", color: "#666" }}>
              <strong>Puesto:</strong>
            </p>
            <p style={{ margin: "0", fontSize: "18px" }}>{puesto}</p>
          </div>
          <div>
            <p style={{ margin: "8px 0", color: "#666" }}>
              <strong>Estado:</strong>
            </p>
            <p style={{ margin: "0", fontSize: "18px" }}>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "4px",
                  backgroundColor: estado ? "#4CAF50" : "#f44336",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {estado ? "ACTIVO" : "INACTIVO"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Sección de Información del Sistema */}
      <div
        style={{
          border: "1px solid #FF9800",
          padding: "20px",
          margin: "20px 0",
          borderRadius: "8px",
          backgroundColor: "#fffaf0",
        }}
      >
        <h2 style={{ marginTop: 0, color: "#FF9800" }}>
          🔧 Información del Sistema
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          <div>
            <p style={{ margin: "8px 0", color: "#666" }}>
              <strong>ID de Usuario:</strong>
            </p>
            <p
              style={{ margin: "0", fontSize: "18px", fontFamily: "monospace" }}
            >
              {id}
            </p>
          </div>
          <div>
            <p style={{ margin: "8px 0", color: "#666" }}>
              <strong>ID de Rol:</strong>
            </p>
            <p
              style={{ margin: "0", fontSize: "18px", fontFamily: "monospace" }}
            >
              {id_Rol}
            </p>
          </div>
          <div>
            <p style={{ margin: "8px 0", color: "#666" }}>
              <strong>ID de País:</strong>
            </p>
            <p
              style={{ margin: "0", fontSize: "18px", fontFamily: "monospace" }}
            >
              {id_Pais}
            </p>
          </div>
          <div>
            <p style={{ margin: "8px 0", color: "#666" }}>
              <strong>Azure AD User ID:</strong>
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "14px",
                fontFamily: "monospace",
                wordBreak: "break-all",
              }}
            >
              {azure_AD_User_Id}
            </p>
          </div>
        </div>
      </div>

      {/* Sección de Fechas */}
      <div
        style={{
          border: "1px solid #9C27B0",
          padding: "20px",
          margin: "20px 0",
          borderRadius: "8px",
          backgroundColor: "#faf5ff",
        }}
      >
        <h2 style={{ marginTop: 0, color: "#9C27B0" }}>
          📅 Información Temporal
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          <div>
            <p style={{ margin: "8px 0", color: "#666" }}>
              <strong>Fecha de Creación:</strong>
            </p>
            <p style={{ margin: "0", fontSize: "16px" }}>
              {formatDate(fecha_Creacion)}
            </p>
          </div>
          <div>
            <p style={{ margin: "8px 0", color: "#666" }}>
              <strong>Última Modificación:</strong>
            </p>
            <p style={{ margin: "0", fontSize: "16px" }}>
              {formatDate(fecha_Modificacion)}
            </p>
          </div>
        </div>
      </div>

      {/* Sección de Debug - Objeto completo */}
      <details style={{ marginTop: "30px" }}>
        <summary
          style={{
            cursor: "pointer",
            padding: "10px",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          🔍 Ver Objeto de Usuario Completo (Debug)
        </summary>
        <pre
          style={{
            backgroundColor: "#1e1e1e",
            color: "#d4d4d4",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
            marginTop: "10px",
          }}
        >
          {JSON.stringify(user, null, 2)}
        </pre>
      </details>

      {/* Botón de cerrar sesión */}
      <button
        onClick={logout}
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#d32f2f")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#f44336")}
      >
        🚪 Cerrar Sesión
      </button>
    </div>
  );
};

export default Admin;
