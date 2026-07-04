import "./Dashboard.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Header />

        <div className="cards">

        </div>

      </div>

    </div>
  );
}

export default Dashboard;