import "./header.css";

import {
  FaSearch,
  FaBell,
  FaCog,
  FaUserCircle,
  FaBars
} from "react-icons/fa";

function Header() {

  const hoje = new Date();

  const saudacao = () => {

    const hora = hoje.getHours();

    if (hora < 12) return "Bom dia";

    if (hora < 18) return "Boa tarde";

    return "Boa noite";
  };

  return (

    <header className="header">

      <div className="header-left">

        <button className="menu-button">

          <FaBars className="bars"/>

        </button>

        <div>

          <h2>Dashboard</h2>

          <span>
            {saudacao()}, Arthur 👋
          </span>

        </div>

      </div>

      <div className="header-center">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Pesquisar..."
          />

        </div>

      </div>

      <div className="header-right">

        <button>

          <FaBell className="notification-icon"/>

          <span className="notification">3</span>

        </button>

        <button>

          <FaCog className="config-icon"/>

        </button>

        <div className="profile">

          <FaUserCircle className="avatar"/>

          <div>

            <strong>Arthur Rosa</strong>

            <small>Administrador</small>

          </div>

        </div>

      </div>

    </header>

  );
}

export default Header;