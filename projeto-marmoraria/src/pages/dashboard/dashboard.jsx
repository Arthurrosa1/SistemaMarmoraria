import "./Dashboard.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import DashboardCards from "../../components/DashboardCards/DashboardCards";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <main className="content">

        <Header />

        <DashboardCards />

      </main>

    </div>
  );
}

export default Dashboard;