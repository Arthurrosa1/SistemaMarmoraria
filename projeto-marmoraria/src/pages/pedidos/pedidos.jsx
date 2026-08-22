import { useState } from "react";
import "../dashboard/dashboard.css";
import "./pedidos.css";

import { FaPlus, FaSearch } from "react-icons/fa";

import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import Modal from "../../components/modal/modal";

import { useData } from "../../data/DataContext";
import { getStatusTone } from "../../data/mockData";

function formatMoney(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const STATUS_OPCOES = ["Orçamento", "Aguardando material", "Em produção", "Instalado"];

function NovoPedidoForm({ onClose }) {
  const { clientes, addPedido } = useData();
  const [cliente, setCliente] = useState("");
  const [material, setMaterial] = useState("");
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState(STATUS_OPCOES[0]);
  const [erro, setErro] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!cliente || !material || !valor) {
      setErro("Preencha cliente, material e valor.");
      return;
    }
    addPedido({ cliente, material, valor, status });
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Cliente</label>
        <select value={cliente} onChange={(e) => setCliente(e.target.value)}>
          <option value="">Selecione um cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.nome}>{c.nome}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label>Material</label>
        <input
          type="text"
          placeholder="Ex: Granito Preto São Gabriel"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label>Valor (R$)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="0,00"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUS_OPCOES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {erro && <span className="form-error">{erro}</span>}

      <div className="modal-actions">
        <button type="button" className="btn-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className="btn-primary">
          Salvar pedido
        </button>
      </div>
    </form>
  );
}

function Pedidos() {
  const { pedidos } = useData();
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState("");

  const pedidosFiltrados = pedidos.filter((p) => {
    const termo = busca.toLowerCase();
    return (
      p.cliente.toLowerCase().includes(termo) ||
      p.id.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Header />

        <div className="page-toolbar">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Buscar por cliente ou nº do pedido..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={() => setModalAberto(true)}>
            <FaPlus />
            Novo pedido
          </button>
        </div>

        <div className="panel panel-tabela" style={{ marginTop: 18 }}>
          <h3>Todos os pedidos ({pedidosFiltrados.length})</h3>
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
              {pedidosFiltrados.map((p) => (
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
              {pedidosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "#9ca3af", padding: 24 }}>
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalAberto && (
        <Modal title="Novo pedido" onClose={() => setModalAberto(false)}>
          <NovoPedidoForm onClose={() => setModalAberto(false)} />
        </Modal>
      )}
    </div>
  );
}

export default Pedidos;
