import { Routes, Route } from "react-router"; // Importa de react-router-dom
import { Landing } from "./Modules/Landing/pages/";
import {
  Admin,
  Countries,
  Customers,
  Services,
  Users,
  Contracts,
} from "./Modules/Admin/pages";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/countries" element={<Countries />} />
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/services" element={<Services />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/contracts" element={<Contracts />} />
      </Routes>
    </>
  );
}

export default App;
