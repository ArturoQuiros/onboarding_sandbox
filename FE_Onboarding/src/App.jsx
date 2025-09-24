import { Routes, Route } from "react-router-dom";
// 1. Importa el componente de layout
import AdminLayout from "./Modules/Admin/layouts/AdminLayout";
import {
  Admin,
  Countries,
  Customers,
  Services,
  Users,
  Contracts,
} from "./Modules/Admin/pages";
import { Landing, CustomerLogin } from "./Modules/Landing/pages";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/client-login" element={<CustomerLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          {/* 3. Rutas anidadas sin el prefijo /admin */}
          <Route index element={<Admin />} />{" "}
          {/* 4. Ruta por defecto para /admin */}
          <Route path="countries" element={<Countries />} />
          <Route path="customers" element={<Customers />} />
          <Route path="services" element={<Services />} />
          <Route path="users" element={<Users />} />
          <Route path="contracts" element={<Contracts />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
