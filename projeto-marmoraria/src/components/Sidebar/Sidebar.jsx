import "./Sidebar.css";

import {
  FaHome,
  FaClipboardList,
  FaUsers,
  FaBoxes,
  FaWarehouse,
  FaIndustry,
  FaDollarSign,
  FaCog,
  FaChartLine,
  FaUserCircle,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">

        <div className="logo-icon">
          ◈
        </div>

        <div>
          <h2>Marmorix</h2>
          <span>Sistema de Gestão</span>
        </div>

      </div>

      <div className="menu-title">
        Principal
      </div>

      <nav>

        <a className="active" href="#">
          <FaHome />
          Dashboard
        </a>

        <a href="#">
          <FaClipboardList />
          Pedidos
        </a>

        <a href="#">
          <FaUsers />
          Clientes
        </a>

        <a href="#">
          <FaBoxes />
          Materiais
        </a>

        <a href="#">
          <FaWarehouse />
          Estoque
        </a>

        <a href="#">
          <FaIndustry />
          Produção
        </a>

      </nav>

      <div className="menu-title">
        Gestão
      </div>

      <nav>

        <a href="#">
          <FaDollarSign />
          Financeiro
        </a>

        <a href="#">
          <FaChartLine />
          Relatórios
        </a>

        <a href="#">
          <FaCog />
          Configurações
        </a>

      </nav>

      <div className="profile">

        <FaUserCircle className="profile-icon"/>

        <div>

          <strong>Arthur Rosa</strong>

          <span>Administrador</span>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;