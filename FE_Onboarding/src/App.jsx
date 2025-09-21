import React from "react";
import { Routes, Route } from "react-router"; // Importa de react-router-dom
import { Landing } from "./Modules/Landing/pages/";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
