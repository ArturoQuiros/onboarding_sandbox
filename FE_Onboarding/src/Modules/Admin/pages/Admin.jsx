// src/Modules/Admin/pages/Admin.jsx

import React from "react";
// 💡 Asumo que useAuth se importa desde tu archivo de barril o AuthContext.jsx
import { useAuth } from "../../../Global/hooks";

/**
 * Página principal del panel de administración.
 * Muestra información resumida sobre clientes, contratos y servicios.
 */
const Admin = () => {
  // 💡 LLAMADA AL HOOK DENTRO DEL COMPONENTE
  const {
    user, // Objeto completo del usuario
    isAuthenticated, // Estado de autenticación
    nombre, // Nombre del usuario
    rol, // Rol del usuario
    logout, // Función para cerrar sesión
  } = useAuth();

  // --- Lógica Condicional ---

  if (!isAuthenticated) {
    // Si por alguna razón el usuario llega aquí sin autenticar,
    // podríamos mostrar un mensaje o, mejor aún, redirigir
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h2>Acceso Denegado</h2>
        <p>No se encontró una sesión válida. Por favor, inicia sesión.</p>
      </div>
    );
  }

  // --- Renderizado del Contenido ---

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel de Administración</h1>
      <p>
        Vista general de clientes actuales, estado de contratos y servicios
        contratados.
      </p>

      {/* --- Sección de Estado de Autenticación y Datos --- */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          margin: "20px 0",
          borderRadius: "5px",
        }}
      >
        <h2>Estado de la Sesión</h2>
        <p>
          Estado de Autenticación:
          <strong style={{ color: isAuthenticated ? "green" : "red" }}>
            {isAuthenticated ? "AUTENTICADO" : "NO AUTENTICADO"}
          </strong>
        </p>

        {/* Mostrar detalles solo si está autenticado */}
        {user && (
          <div>
            <p>
              <strong>Bienvenido:</strong> {nombre}
            </p>
            <p>
              <strong>Rol Asignado:</strong> {rol}
            </p>
            <p>
              <strong>ID de Usuario:</strong> {user.id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
