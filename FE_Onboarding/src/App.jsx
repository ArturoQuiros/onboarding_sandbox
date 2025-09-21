import { Routes, Route } from "react-router"; // Importa de react-router-dom
import { Landing } from "./Modules/Landing/pages/";
import { Admin, Countries } from "./Modules/Admin/pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/countries" element={<Countries />} />
      </Routes>
    </>
  );
}

export default App;
