// src/App.jsx

import { Routes, Route } from "react-router-dom";
import AdminLayout from "./Modules/Admin/layouts/AdminLayout";
import { LandingLayout } from "./Modules/Landing/layouts/";
import {
  Admin,
  Countries,
  Customers,
  Services,
  Staff,
  Contracts,
  Users,
  ContractServices,
} from "./Modules/Admin/pages";
import { Landing, CustomerLogin, StaffLogin } from "./Modules/Landing/pages";
import { Toaster } from "react-hot-toast";

// 🎯 IMPORTACIONES DEL FLUJO DE TAREAS (Landing y Task Page)
import {
  OnboardingLanding,
  ClientContractPage,
  StaffReviewPage,
} from "./Modules/Onboarding/pages";

import { TaskFlowLayout } from "./Modules/Onboarding/layouts";
function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Routes>
        {/* Usamos el LandingLayout para envolver las rutas públicas */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Landing />} />
          <Route path="client-login" element={<CustomerLogin />} />
          <Route path="staff-login" element={<StaffLogin />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="countries" element={<Countries />} />
          <Route path="customers" element={<Customers />} />
          <Route path="services" element={<Services />} />
          <Route path="staff" element={<Staff />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="users" element={<Users />} />
        </Route>

        <Route path="client/contract/:contractId" element={<TaskFlowLayout />}>
          <Route path="task/:taskId" element={<ClientContractPage />} />
          {/* Se podría agregar la ruta índice para mostrar el resumen del contrato si no se selecciona tarea */}
          <Route index element={<div>Resumen del Contrato para Cliente</div>} />
        </Route>

        {/* 2. RUTA PARA EL STAFF: /staff/review/456/task/789 */}
        {/* También usamos el TaskFlowLayout, pero inyectamos la página de revisión */}
        <Route path="staff/review/:contractId" element={<TaskFlowLayout />}>
          <Route path="task/:taskId" element={<StaffReviewPage />} />
          {/* Si un staff accede a la base del contrato, podría ser una vista de gestión general */}
          <Route
            index
            element={<div>Gestión y Tareas Pendientes para Staff</div>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
