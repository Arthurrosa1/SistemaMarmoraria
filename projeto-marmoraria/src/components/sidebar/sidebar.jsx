import "./sidebar.css";

import {
  FaHome,
  FaClipboardList,
  FaUsers,
  FaBoxes,
  FaWarehouse,
  FaIndustry,
  FaTruck,
  FaDollarSign,
  FaChartLine,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">

        <div className="logo-icon">
          ◈
        </div>

        <div>
          <h2>Marmorix</h2>
          <span>Sistema de Gestão</span>
        </div>

      </div>

      <div className="sidebar-section">
        <span>PRINCIPAL</span>

        <NavLink to="/dashboard">
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/pedidos">
          <FaClipboardList />
          Pedidos
        </NavLink>

        <NavLink to="/clientes">
          <FaUsers />
          Clientes
        </NavLink>

        <NavLink to="/materiais">
          <FaBoxes />
          Materiais
        </NavLink>

        <NavLink to="/estoque">
          <FaWarehouse />
          Estoque
        </NavLink>

        <NavLink to="/producao">
          <FaIndustry />
          Produção
        </NavLink>

        <NavLink to="/instalacoes">
          <FaTruck />
          Instalações
        </NavLink>

      </div>

      <div className="sidebar-section">

        <span>GESTÃO</span>

        <NavLink to="/financeiro">
          <FaDollarSign />
          Financeiro
        </NavLink>

        <NavLink to="/relatorios">
          <FaChartLine />
          Relatórios
        </NavLink>

        <NavLink to="/configuracoes">
          <FaCog />
          Configurações
        </NavLink>

      </div>

      <div className="sidebar-user">

        <FaUserCircle className="user-icon"/>

        <div>

          <strong>Arthur Rosa</strong>

          <small>Administrador</small>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;