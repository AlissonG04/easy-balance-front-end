import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Balanca from "./pages/Balanca";
import Relatorios from "./pages/Relatorios";
import Usuarios from "./pages/Usuarios";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/balanca" element={<Balanca />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </Router>
  );
}

export default App;
