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
} from "./Modules/Admin/pages";
import { Landing, CustomerLogin, StaffLogin } from "./Modules/Landing/pages";
import { Toaster } from "react-hot-toast";

// 🎯 IMPORTACIONES DEL FLUJO DE TAREAS (Landing y Task Page)
import {
  ClientHome,
  ClientContractPage,
  StaffReviewPage,
} from "./Modules/Onboarding/pages";

import { TaskFlowLayout } from "./Modules/Onboarding/layouts";

//Usuarios ADMIN

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

        {/* SOLO ACCESO USUARIO INTERNO (STAFF) */}

        {/* RUTAS ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="countries" element={<Countries />} />
          <Route path="services" element={<Services />} />

          <Route path="services/:serviceId/tasks">
            <Route index element={<Tasks />} />
          </Route>

          <Route path="staff" element={<Staff />} />
          <Route
            path="contracts/:contractId/services"
            element={<ContractServices />}
          />
        </Route>

        {/* RUTAS MAMANGER */}
        <Route path="customers" element={<Customers />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="users" element={<Users />} />

        {/* 🎯 RUTAS CLIENTE - ACCESO A USUARIO INTERNO y EXTERNO*/}
        <Route path="client/contract/:contractId" element={<TaskFlowLayout />}>
          {/* 🎯 RUTAS CLIENTE - PARA TODOS LOS ROLES*/}

          <Route index element={<ClientHome />} />

          {/* Vista de una tarea específica dentro de un servicio */}
          <Route
            path="service/:serviceId/task/:taskId"
            element={<ClientContractPage />}
          />
        </Route>

        {/* 🎯 RUTAS STAFF (MANAGER, ADMIN y USER de USUARIO*/}
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
