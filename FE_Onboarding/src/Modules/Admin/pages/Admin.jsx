// src/Modules/Admin/pages/Admin.jsx

import React from "react";
import { useAuth } from "../../../Global/hooks"; // Asumo que useAuth es un custom hook que envuelve useContext(AuthContext)

/**
 * Página principal del panel de administración.
 */
const Admin = () => {
  // Desestructuramos el objeto user y el estado de autenticación
  const { user, isAuthenticated, logout } = useAuth(); // 🛑 CORRECCIÓN: Si no está autenticado o el objeto user es null/undefined, mostramos la pantalla de carga/error.

  if (!isAuthenticated || !user) {
    return (
      <div style={{ padding: "20px", color: "gray" }}>
        <h2>Cargando Datos de Usuario...</h2>
        <p>Verificando el perfil de usuario.</p>
      </div>
    );
  }

  // A partir de aquí, el objeto 'user' está garantizado y cargado
  const { nombre, email, puesto, id_Rol } = user; // --- Renderizado del Contenido ---

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
        <h2>Estado de la Sesión y Datos Cargados ✅</h2>
        <p>
          Estado de Autenticación:
          <strong style={{ color: "green" }}>AUTENTICADO</strong>
        </p>

        <div>
          <p>
            <strong>Bienvenido:</strong> {nombre}
          </p>

          <p>
            <strong>Email:</strong> {email}
          </p>

          <p>
            <strong>Puesto:</strong> {puesto}
          </p>

          <p>
            <strong>Rol ID:</strong> {id_Rol}
          </p>

          <p>
            <strong>ID de Usuario (API):</strong> {user.id}
          </p>
        </div>
      </div>
      {/* Botón de ejemplo para cerrar sesión */}
      <button onClick={logout} style={{ marginTop: "20px", padding: "10px" }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Admin;
