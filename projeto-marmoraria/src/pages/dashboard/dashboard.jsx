import "./dashboard.css";

import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import DashboardCards from "../../components/dashboardCards/dashboardCards";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Header />

        <DashboardCards />

      </div>

    </div>
  );
}

export default Dashboard;