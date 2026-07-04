import "./DashboardCards.css";

import DashboardCard from "../DashboardCard/DashboardCard";

import {
  FaClipboardList,
  FaUsers,
  FaIndustry,
  FaDollarSign
} from "react-icons/fa";

function DashboardCards() {
  return (
    <div className="cards">

      <DashboardCard
        title="Pedidos"
        value="18"
        subtitle="+5 hoje"
        icon={<FaClipboardList />}
      />

      <DashboardCard
        title="Clientes"
        value="124"
        subtitle="+2 hoje"
        icon={<FaUsers />}
      />

      <DashboardCard
        title="Produção"
        value="7"
        subtitle="Em andamento"
        icon={<FaIndustry />}
      />

      <DashboardCard
        title="Faturamento"
        value="R$ 52.340"
        subtitle="Este mês"
        icon={<FaDollarSign />}
      />

    </div>
  );
}

export default DashboardCards;