import { Navigate } from "react-router-dom";
import { useStaffAuth } from "../Context";
// import { useClientAuth } from "../Context/ClientAuthContext"; // se habilitará luego

export const AuthGuard = ({ allowedRoles, allowedUserTypes, children }) => {
  const staffAuth = useStaffAuth();
  const userType = sessionStorage.getItem("userType");

  // Elegir contexto según tipo de usuario
  const auth = userType === "staff" ? staffAuth : null; // luego se agregará: userType === "client" ? clientAuth : null;

  // 🔹 Esperar mientras se verifica la sesión
  if (auth?.loading) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        Verificando sesión...
      </div>
    );
  }

  // 🔹 Si no está autenticado, redirige a la raíz
  if (!auth?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 🔹 Validar tipo de usuario permitido
  if (allowedUserTypes && !allowedUserTypes.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 🔹 Validar rol permitido
  if (allowedRoles && !allowedRoles.includes(auth.user?.id_Rol)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 🔹 Usuario autorizado, renderiza hijos
  return children;
};
