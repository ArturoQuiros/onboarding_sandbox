import { Routes, Route } from "react-router"; // Importa de react-router-dom
import { Landing } from "./Modules/Landing/pages/";
import { Admin } from "./Modules/Admin/pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
