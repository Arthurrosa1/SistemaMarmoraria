import "../dashboard/dashboard.css";
import "./pedidos.css";

import { FaPlus, FaSearch } from "react-icons/fa";

import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";

import { pedidosRecentes, getStatusTone } from "../../data/mockData";

function formatMoney(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function Pedidos() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Header />

        <div className="page-toolbar">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Buscar por cliente ou nº do pedido..." />
          </div>

          <button className="btn-primary">
            <FaPlus />
            Novo pedido
          </button>
        </div>

        <div className="panel panel-tabela" style={{ marginTop: 18 }}>
          <h3>Todos os pedidos</h3>
          <table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Material</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {pedidosRecentes.map((p) => (
                <tr key={p.id}>
                  <td className="mono">{p.id}</td>
                  <td>{p.cliente}</td>
                  <td>{p.material}</td>
                  <td>{formatMoney(p.valor)}</td>
                  <td>
                    <span className={`badge badge-${getStatusTone(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>{p.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pedidos;
