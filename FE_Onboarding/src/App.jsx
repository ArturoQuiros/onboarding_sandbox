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
  Tasks,
  TaskDetail,
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
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Landing />} />
          <Route path="client-login" element={<CustomerLogin />} />
          <Route path="staff-login" element={<StaffLogin />} />
        </Route>

        {/* RUTAS ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="countries" element={<Countries />} />
          <Route path="customers" element={<Customers />} />
          <Route path="services" element={<Services />} />

          <Route path="services/:serviceId/tasks">
            <Route index element={<Tasks />} />
            <Route path="new" element={<TaskDetail />} />
            <Route path=":taskId" element={<TaskDetail />} />
          </Route>

          <Route path="staff" element={<Staff />} />
          <Route path="contracts" element={<Contracts />} />
          <Route
            path="contracts/:contractId/services"
            element={<ContractServices />}
          />
          <Route path="users" element={<Users />} />
        </Route>

        {/* 🎯 RUTAS CLIENTE */}
        <Route path="client/contract/:contractId" element={<TaskFlowLayout />}>
          <Route
            path="service/:serviceId/task/:taskId"
            element={<ClientContractPage />}
          />
          <Route index element={<div>Resumen del Contrato</div>} />
        </Route>

        {/* 🎯 RUTAS STAFF */}
        <Route path="staff/contract/:contractId" element={<TaskFlowLayout />}>
          <Route
            path="service/:serviceId/task/:taskId"
            element={<StaffReviewPage />}
          />
          <Route index element={<div>Gestión del Contrato</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
