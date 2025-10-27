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
import { AuthGuard } from "./Global/auth";

// 🎯 IMPORTACIONES DEL FLUJO DE TAREAS (Landing y Task Page)
import {
  ClientHome,
  ClientContractPage,
  StaffReviewPage,
} from "./Modules/Onboarding/pages";

import { TaskFlowLayout } from "./Modules/Onboarding/layouts";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Routes>
        {/* 🌐 RUTAS PÚBLICAS */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Landing />} />
          <Route path="client-login" element={<CustomerLogin />} />
          <Route path="staff-login" element={<StaffLogin />} />
        </Route>

        {/* 🛡️ RUTAS ADMIN + MANAGER - STAFF */}
        <Route
          path="/admin"
          element={
            <AuthGuard allowedUserTypes={["staff"]} allowedRoles={[1, 2]}>
              <AdminLayout />
            </AuthGuard>
          }
        >
          {/* Admin solamente */}
          <Route index element={<Admin />} />
          <Route
            path="users"
            element={
              <AuthGuard allowedUserTypes={["staff"]} allowedRoles={[1]}>
                <Users />
              </AuthGuard>
            }
          />

          {/* Admin o Manager */}
          <Route
            path="customers"
            element={
              <AuthGuard allowedUserTypes={["staff"]} allowedRoles={[1, 2]}>
                <Customers />
              </AuthGuard>
            }
          />
          <Route
            path="contracts"
            element={
              <AuthGuard allowedUserTypes={["staff"]} allowedRoles={[1, 2]}>
                <Contracts />
              </AuthGuard>
            }
          />

          {/* Admin */}
          <Route path="countries" element={<Countries />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceId/tasks" element={<Tasks />} />
          <Route path="staff" element={<Staff />} />
          <Route
            path="contracts/:contractId/services"
            element={<ContractServices />}
          />
        </Route>

        {/* 🎯 RUTAS CLIENTE - Acceso a STAFF o CLIENT */}
        <Route
          path="client/contract/:contractId"
          element={
            <AuthGuard
              allowedUserTypes={["staff", "client"]}
              allowedRoles={[1, 2, 3]}
            >
              <TaskFlowLayout />
            </AuthGuard>
          }
        >
          <Route index element={<ClientHome />} />
          <Route
            path="service/:serviceId/task/:taskId"
            element={<ClientContractPage />}
          />
        </Route>

        {/* 🎯 RUTAS STAFF (Manager, Admin y User) */}
        <Route
          path="staff/contract/:contractId"
          element={
            <AuthGuard allowedUserTypes={["staff"]} allowedRoles={[1, 2, 3]}>
              <TaskFlowLayout />
            </AuthGuard>
          }
        >
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
