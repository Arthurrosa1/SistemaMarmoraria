import "../dashboard/dashboard.css";
import "../pedidos/pedidos.css";

import { FaPlus, FaSearch, FaUserCircle } from "react-icons/fa";

import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";

import { clientesRecentes } from "../../data/mockData";

function Clientes() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Header />

        <div className="page-toolbar">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Buscar por nome ou telefone..." />
          </div>

          <button className="btn-primary">
            <FaPlus />
            Novo cliente
          </button>
        </div>

        <div className="panel panel-tabela" style={{ marginTop: 18 }}>
          <h3>Todos os clientes</h3>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Telefone</th>
                <th>Pedidos</th>
                <th>Último pedido</th>
              </tr>
            </thead>
            <tbody>
              {clientesRecentes.map((c) => (
                <tr key={c.nome}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <FaUserCircle style={{ fontSize: 20, color: "#9ca3af" }} />
                      {c.nome}
                    </div>
                  </td>
                  <td>{c.tipo}</td>
                  <td>{c.telefone}</td>
                  <td>{c.pedidos}</td>
                  <td>{c.ultimoPedido}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Clientes;
