import "./dashboard.css";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  FaClipboardList,
  FaUsers,
  FaIndustry,
  FaDollarSign,
} from "react-icons/fa";

import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import StatCard from "../../components/statCard/statCard";

import {
  dashboardStats,
  faturamentoTrend,
  materiaisPorCategoria,
  pedidosRecentes,
  getStatusTone,
} from "../../data/mockData";

function formatMoney(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Header />

        <div className="stats-row">
          <StatCard
            title="Pedidos abertos"
            value={dashboardStats.pedidosAbertos}
            subtitle={dashboardStats.pedidosVariacao}
            icon={<FaClipboardList />}
            tone="blue"
          />
          <StatCard
            title="Clientes ativos"
            value={dashboardStats.clientesAtivos}
            subtitle={dashboardStats.clientesVariacao}
            icon={<FaUsers />}
            tone="purple"
          />
          <StatCard
            title="Em produção"
            value={dashboardStats.producaoAndamento}
            subtitle={dashboardStats.producaoVariacao}
            icon={<FaIndustry />}
            tone="amber"
          />
          <StatCard
            title="Faturamento do mês"
            value={formatMoney(dashboardStats.faturamentoMes)}
            subtitle={dashboardStats.faturamentoVariacao}
            icon={<FaDollarSign />}
            tone="green"
          />
        </div>

        <div className="charts-row">
          <div className="panel panel-trend">
            <h3>Faturamento nos últimos meses</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={faturamentoTrend} margin={{ left: -20, top: 10 }}>
                <defs>
                  <linearGradient id="corFaturamento" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `R$${Math.round(v / 1000)}k`}
                />
                <Tooltip formatter={(v) => formatMoney(v)} />
                <Area type="monotone" dataKey="valor" stroke="#2563eb" strokeWidth={2} fill="url(#corFaturamento)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="panel panel-categorias">
            <h3>Materiais por categoria</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={materiaisPorCategoria}
                  dataKey="valor"
                  nameKey="categoria"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {materiaisPorCategoria.map((entry) => (
                    <Cell key={entry.categoria} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="legenda">
              {materiaisPorCategoria.map((item) => (
                <div className="legenda-item" key={item.categoria}>
                  <span className="dot" style={{ background: item.cor }} />
                  {item.categoria}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel panel-tabela">
          <h3>Pedidos recentes</h3>
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

export default Dashboard;
