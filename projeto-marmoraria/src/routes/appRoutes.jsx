import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login/login";
import Dashboard from "../pages/dashboard/dashboard";
import Pedidos from "../pages/pedidos/pedidos";
import Clientes from "../pages/clientes/clientes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;