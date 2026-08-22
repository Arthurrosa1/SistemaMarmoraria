// Dados fake para desenvolvimento visual.
// Quando o backend existir, troque as funções abaixo por chamadas de API
// mantendo o mesmo formato de retorno, e as telas não precisam mudar.

export const dashboardStats = {
  pedidosAbertos: 18,
  pedidosVariacao: "+5 hoje",
  clientesAtivos: 124,
  clientesVariacao: "+2 hoje",
  producaoAndamento: 7,
  producaoVariacao: "Em andamento",
  faturamentoMes: 52340,
  faturamentoVariacao: "+8.2%",
};

export const faturamentoTrend = [
  { mes: "Mar", valor: 31000 },
  { mes: "Abr", valor: 35500 },
  { mes: "Mai", valor: 33800 },
  { mes: "Jun", valor: 41200 },
  { mes: "Jul", valor: 44700 },
  { mes: "Ago", valor: 52340 },
];

export const materiaisPorCategoria = [
  { categoria: "Granito", valor: 38, cor: "#2563eb" },
  { categoria: "Mármore", valor: 27, cor: "#f59e0b" },
  { categoria: "Quartzo", valor: 18, cor: "#10b981" },
  { categoria: "Porcelanato", valor: 11, cor: "#a855f7" },
  { categoria: "Ferragens", valor: 6, cor: "#ef4444" },
];

export const pedidosRecentes = [
  { id: "PD-2026-041", cliente: "Ricardo Almeida", material: "Granito Preto São Gabriel", valor: 8400, status: "Em produção", data: "12/08/2026" },
  { id: "PD-2026-040", cliente: "Fernanda Lopes", material: "Mármore Carrara", valor: 15200, status: "Aguardando material", data: "11/08/2026" },
  { id: "PD-2026-039", cliente: "Construtora Vale Sul", material: "Quartzo Branco Ártico", valor: 27600, status: "Instalado", data: "09/08/2026" },
  { id: "PD-2026-038", cliente: "João Pedro Nascimento", material: "Granito Cinza Corumbá", valor: 6100, status: "Orçamento", data: "08/08/2026" },
  { id: "PD-2026-037", cliente: "Studio Arquitetura MZ", material: "Mármore Travertino", valor: 19800, status: "Em produção", data: "06/08/2026" },
];

export const clientesRecentes = [
  { id: "CL-001", nome: "Ricardo Almeida", tipo: "Pessoa física", telefone: "(47) 99811-2233", pedidos: 3, ultimoPedido: "12/08/2026" },
  { id: "CL-002", nome: "Fernanda Lopes", tipo: "Pessoa física", telefone: "(47) 99622-1190", pedidos: 1, ultimoPedido: "11/08/2026" },
  { id: "CL-003", nome: "Construtora Vale Sul", tipo: "Empresa", telefone: "(47) 3255-4400", pedidos: 12, ultimoPedido: "09/08/2026" },
  { id: "CL-004", nome: "João Pedro Nascimento", tipo: "Pessoa física", telefone: "(47) 99944-7712", pedidos: 2, ultimoPedido: "08/08/2026" },
  { id: "CL-005", nome: "Studio Arquitetura MZ", tipo: "Empresa", telefone: "(47) 3211-9090", pedidos: 6, ultimoPedido: "06/08/2026" },
  { id: "CL-006", nome: "Camila Torres", tipo: "Pessoa física", telefone: "(47) 99123-4455", pedidos: 1, ultimoPedido: "02/08/2026" },
];

export const CATEGORIAS_GASTO = [
  { nome: "Material", cor: "#2563eb" },
  { nome: "Mão de obra", cor: "#7c3aed" },
  { nome: "Água/Luz", cor: "#0ea5e9" },
  { nome: "IPTU", cor: "#f59e0b" },
  { nome: "Combustível", cor: "#ef4444" },
  { nome: "Aluguel", cor: "#059669" },
  { nome: "Outros", cor: "#6b7280" },
];

export function getCategoriaCor(categoria) {
  return CATEGORIAS_GASTO.find((c) => c.nome === categoria)?.cor || "#6b7280";
}

export const gastosIniciais = [
  {
    id: "GS-001",
    titulo: "Compra de chapas de granito",
    categoria: "Material",
    valor: 12400,
    data: "05/08/2026",
    descricao: "Lote de chapas para o pedido da Construtora Vale Sul.",
    pedidoId: "PD-2026-039",
    notaFiscal: "3521 0800 1234 5678 9012 3456 7890 1234 5678 9012 3456",
    anexoNome: null,
  },
  {
    id: "GS-002",
    titulo: "Mão de obra - instalação",
    categoria: "Mão de obra",
    valor: 2800,
    data: "07/08/2026",
    descricao: "Equipe externa para instalação no cliente Studio Arquitetura MZ.",
    pedidoId: "PD-2026-037",
    notaFiscal: "",
    anexoNome: null,
  },
  {
    id: "GS-003",
    titulo: "Conta de luz - Agosto",
    categoria: "Água/Luz",
    valor: 640,
    data: "10/08/2026",
    descricao: "Energia elétrica da oficina.",
    pedidoId: null,
    notaFiscal: "",
    anexoNome: null,
  },
  {
    id: "GS-004",
    titulo: "IPTU - parcela 8",
    categoria: "IPTU",
    valor: 380,
    data: "10/08/2026",
    descricao: "Parcela mensal do IPTU do galpão.",
    pedidoId: null,
    notaFiscal: "",
    anexoNome: null,
  },
  {
    id: "GS-005",
    titulo: "Combustível - entregas da semana",
    categoria: "Combustível",
    valor: 310,
    data: "11/08/2026",
    descricao: "Abastecimento do caminhão para entregas e instalações.",
    pedidoId: null,
    notaFiscal: "",
    anexoNome: null,
  },
];

export const receitaTrend = faturamentoTrend;

export const despesaTrendBase = [
  { mes: "Mar", valor: 9200 },
  { mes: "Abr", valor: 11500 },
  { mes: "Mai", valor: 10100 },
  { mes: "Jun", valor: 13800 },
  { mes: "Jul", valor: 15200 },
];

export function getStatusTone(status) {
  const map = {
    "Orçamento": "gray",
    "Aguardando material": "amber",
    "Em produção": "blue",
    "Instalado": "green",
  };
  return map[status] || "gray";
}
