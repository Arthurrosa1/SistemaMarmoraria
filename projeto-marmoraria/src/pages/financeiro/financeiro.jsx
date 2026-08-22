import { useMemo, useState } from "react";
import "../dashboard/dashboard.css";
import "../pedidos/pedidos.css";
import "./financeiro.css";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { FaPlus, FaSearch, FaFileInvoice, FaPaperclip } from "react-icons/fa";

import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import StatCard from "../../components/statCard/statCard";
import Modal from "../../components/modal/modal";

import { useData } from "../../data/DataContext";
import {
  CATEGORIAS_GASTO,
  receitaTrend,
  despesaTrendBase,
  getCategoriaCor,
} from "../../data/mockData";

function formatMoney(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function mesAtualAbrev() {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return meses[new Date().getMonth()];
}

function NovoGastoForm({ onClose }) {
  const { pedidos, addGasto } = useData();
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState(CATEGORIAS_GASTO[0].nome);
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pedidoId, setPedidoId] = useState("");
  const [notaFiscal, setNotaFiscal] = useState("");
  const [anexo, setAnexo] = useState(null);
  const [erro, setErro] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!titulo || !valor) {
      setErro("Preencha ao menos o título e o valor.");
      return;
    }
    addGasto({ titulo, categoria, valor, data, descricao, pedidoId, notaFiscal, anexo });
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Título do gasto</label>
        <input
          type="text"
          placeholder="Ex: Conta de luz - Agosto"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label>Categoria</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {CATEGORIAS_GASTO.map((c) => (
              <option key={c.nome} value={c.nome}>{c.nome}</option>
            ))}
          </select>
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
      </div>

      <div className="form-field">
        <label>Data do gasto</label>
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
      </div>

      <div className="form-field">
        <label>Referente a qual pedido?</label>
        <select value={pedidoId} onChange={(e) => setPedidoId(e.target.value)}>
          <option value="">Gasto geral (não é de um pedido específico)</option>
          {pedidos.map((p) => (
            <option key={p.id} value={p.id}>{p.id} — {p.cliente}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label>Descrição</label>
        <textarea
          rows={3}
          placeholder="Detalhes desse gasto..."
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label>Nota fiscal eletrônica (opcional)</label>
        <input
          type="text"
          placeholder="Número ou chave de acesso da NF-e"
          value={notaFiscal}
          onChange={(e) => setNotaFiscal(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label>Anexar PDF/XML da NF-e (opcional)</label>
        <input
          type="file"
          accept=".pdf,.xml"
          onChange={(e) => setAnexo(e.target.files?.[0] || null)}
        />
        {anexo && <span className="anexo-preview"><FaPaperclip /> {anexo.name}</span>}
      </div>

      {erro && <span className="form-error">{erro}</span>}

      <div className="modal-actions">
        <button type="button" className="btn-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className="btn-primary">
          Salvar gasto
        </button>
      </div>
    </form>
  );
}

function Financeiro() {
  const { pedidos, gastos } = useData();
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");

  const totalRecebido = useMemo(
    () => pedidos.reduce((soma, p) => soma + p.valor, 0),
    [pedidos]
  );

  const totalCustos = useMemo(
    () => gastos.reduce((soma, g) => soma + g.valor, 0),
    [gastos]
  );

  const saldo = totalRecebido - totalCustos;

  const maiorCategoria = useMemo(() => {
    const totais = {};
    gastos.forEach((g) => {
      totais[g.categoria] = (totais[g.categoria] || 0) + g.valor;
    });
    const entradas = Object.entries(totais);
    if (entradas.length === 0) return "—";
    return entradas.sort((a, b) => b[1] - a[1])[0][0];
  }, [gastos]);

  const dadosGrafico = useMemo(() => {
    const totalGastosMesAtual = gastos.reduce((soma, g) => soma + g.valor, 0);
    const pontos = despesaTrendBase.map((d, i) => ({
      mes: d.mes,
      receita: receitaTrend[i]?.valor || 0,
      despesa: d.valor,
    }));
    pontos.push({
      mes: mesAtualAbrev(),
      receita: receitaTrend[receitaTrend.length - 1]?.valor || 0,
      despesa: totalGastosMesAtual,
    });
    return pontos;
  }, [gastos]);

  const gastosFiltrados = gastos.filter((g) => {
    const termo = busca.toLowerCase();
    const bateBusca =
      g.titulo.toLowerCase().includes(termo) ||
      (g.descricao || "").toLowerCase().includes(termo);
    const bateCategoria = filtroCategoria === "Todas" || g.categoria === filtroCategoria;
    return bateBusca && bateCategoria;
  });

  function pedidoLabel(pedidoId) {
    if (!pedidoId) return "Gasto geral";
    const pedido = pedidos.find((p) => p.id === pedidoId);
    return pedido ? `${pedido.id} — ${pedido.cliente}` : pedidoId;
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Header />

        <div className="stats-row">
          <StatCard title="Total recebido" value={formatMoney(totalRecebido)} subtitle="Soma dos pedidos" tone="green" />
          <StatCard title="Total de custos" value={formatMoney(totalCustos)} subtitle={`${gastos.length} lançamentos`} subtitleUp={false} tone="amber" />
          <StatCard
            title="Saldo"
            value={formatMoney(saldo)}
            subtitle={saldo >= 0 ? "Positivo" : "Negativo"}
            subtitleUp={saldo >= 0}
            tone={saldo >= 0 ? "blue" : "amber"}
          />
          <StatCard title="Maior categoria de gasto" value={maiorCategoria} subtitle="No período" tone="purple" />
        </div>

        <div className="panel" style={{ marginTop: 18 }}>
          <h3>Receita x Despesa por mês</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={dadosGrafico} margin={{ left: -20, top: 10 }}>
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R$${Math.round(v / 1000)}k`}
              />
              <Tooltip formatter={(v) => formatMoney(v)} />
              <Legend />
              <Bar dataKey="despesa" name="Despesa" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={26} />
              <Line type="monotone" dataKey="receita" name="Receita" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="page-toolbar" style={{ marginTop: 18 }}>
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Buscar por título ou descrição..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <select
            className="filtro-categoria"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="Todas">Todas as categorias</option>
            {CATEGORIAS_GASTO.map((c) => (
              <option key={c.nome} value={c.nome}>{c.nome}</option>
            ))}
          </select>

          <button className="btn-primary" onClick={() => setModalAberto(true)}>
            <FaPlus />
            Novo gasto
          </button>
        </div>

        <div className="panel panel-tabela" style={{ marginTop: 18 }}>
          <h3>Lançamentos ({gastosFiltrados.length})</h3>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoria</th>
                <th>Pedido relacionado</th>
                <th>Valor</th>
                <th>Data</th>
                <th>NF-e</th>
              </tr>
            </thead>
            <tbody>
              {gastosFiltrados.map((g) => (
                <tr key={g.id}>
                  <td>{g.titulo}</td>
                  <td>
                    <span className="badge-categoria" style={{ background: `${getCategoriaCor(g.categoria)}1a`, color: getCategoriaCor(g.categoria) }}>
                      {g.categoria}
                    </span>
                  </td>
                  <td>{pedidoLabel(g.pedidoId)}</td>
                  <td>{formatMoney(g.valor)}</td>
                  <td>{g.data}</td>
                  <td>
                    {g.anexoUrl ? (
                      <a href={g.anexoUrl} target="_blank" rel="noreferrer" className="nfe-link">
                        <FaFileInvoice /> {g.anexoNome}
                      </a>
                    ) : g.notaFiscal ? (
                      <span className="nfe-link"><FaFileInvoice /> Informada</span>
                    ) : (
                      <span style={{ color: "#9ca3af" }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
              {gastosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "#9ca3af", padding: 24 }}>
                    Nenhum gasto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalAberto && (
        <Modal title="Novo gasto" onClose={() => setModalAberto(false)}>
          <NovoGastoForm onClose={() => setModalAberto(false)} />
        </Modal>
      )}
    </div>
  );
}

export default Financeiro;
