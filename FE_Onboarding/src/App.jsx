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
  OnboardingTaskPage,
} from "./Modules/Onboarding/pages";

import { TaskFlowLayout } from "./Modules/Onboarding/layouts";
function App() {
  // Define la base de la ruta para los servicios de un contrato
  // NOTA: Esta ruta ya no lleva el prefijo /admin
  const contractServiceBasePath = "contracts/:contractId/service/:serviceId";

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

        {/* ----------------------------------------------------------------- */}
        {/* RUTAS ESTÁNDARES DE ADMINISTRACIÓN (Con prefijo /admin) */}
        {/* ----------------------------------------------------------------- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="countries" element={<Countries />} />
          <Route path="customers" element={<Customers />} />
          <Route path="services" element={<Services />} />
          <Route path="staff" element={<Staff />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="users" element={<Users />} />
          {/* Mantenemos esta ruta antigua dentro de /admin si no se usa el ID del contrato */}
          {/* <Route path="contracts/:id/services" element={<ContractServices />} /> */}
        </Route>

        {/* ----------------------------------------------------------------- */}
        {/* RUTAS ESPECÍFICAS DE CONTRATOS/SERVICIOS (Nivel superior, pero usando AdminLayout) */}
        {/* ----------------------------------------------------------------- */}
        <Route element={<TaskFlowLayout />}>
          {/* Ruta existente para ver todos los servicios de un contrato (fuera de /admin) */}
          {/* Nueva Ruta: /contracts/:id/services */}
          <Route path="contracts/:id/services" element={<ContractServices />} />

          {/* 1. Página de Aterrizaje/Resumen del Servicio */}
          {/* Nueva Ruta: /contracts/:contractId/service/:serviceId */}
          <Route
            path={contractServiceBasePath}
            element={<OnboardingLanding />}
          />

          {/* 2. Página del Flujo de Tareas Detallado (Motor de Ejecución) */}
          {/* Nueva Ruta: /contracts/:contractId/service/:serviceId/flow */}
          <Route
            path={`${contractServiceBasePath}/flow`}
            element={<OnboardingTaskPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
