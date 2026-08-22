import { useState } from "react";
import "../dashboard/dashboard.css";
import "../pedidos/pedidos.css";

import { FaPlus, FaSearch, FaUserCircle } from "react-icons/fa";

import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import Modal from "../../components/modal/modal";

import { useData } from "../../data/DataContext";

const TIPO_OPCOES = ["Pessoa física", "Empresa"];

function NovoClienteForm({ onClose }) {
  const { addCliente } = useData();
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState(TIPO_OPCOES[0]);
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!nome || !telefone) {
      setErro("Preencha nome e telefone.");
      return;
    }
    addCliente({ nome, tipo, telefone });
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Nome / Razão social</label>
        <input
          type="text"
          placeholder="Ex: Ricardo Almeida"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label>Tipo</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          {TIPO_OPCOES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label>Telefone</label>
        <input
          type="text"
          placeholder="(47) 99999-0000"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>

      {erro && <span className="form-error">{erro}</span>}

      <div className="modal-actions">
        <button type="button" className="btn-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className="btn-primary">
          Salvar cliente
        </button>
      </div>
    </form>
  );
}

function Clientes() {
  const { clientes } = useData();
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState("");

  const clientesFiltrados = clientes.filter((c) => {
    const termo = busca.toLowerCase();
    return (
      c.nome.toLowerCase().includes(termo) ||
      c.telefone.includes(termo)
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
              placeholder="Buscar por nome ou telefone..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={() => setModalAberto(true)}>
            <FaPlus />
            Novo cliente
          </button>
        </div>

        <div className="panel panel-tabela" style={{ marginTop: 18 }}>
          <h3>Todos os clientes ({clientesFiltrados.length})</h3>
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
              {clientesFiltrados.map((c) => (
                <tr key={c.id}>
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
              {clientesFiltrados.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "#9ca3af", padding: 24 }}>
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalAberto && (
        <Modal title="Novo cliente" onClose={() => setModalAberto(false)}>
          <NovoClienteForm onClose={() => setModalAberto(false)} />
        </Modal>
      )}
    </div>
  );
}

export default Clientes;
