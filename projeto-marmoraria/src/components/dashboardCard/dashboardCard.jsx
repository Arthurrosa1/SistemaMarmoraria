import React from "react";
import "./dashboardCard.css";

function DashboardCard({
  title,
  value,
  subtitle,
  icon
}) {
  return (
    <div className="card">

      <div className="card-top">

        <div className="card-icon">
          {icon}
        </div>

      </div>

      <h3>{title}</h3>

      <h1>{value}</h1>

      <span>{subtitle}</span>

    </div>
  );
}

export default DashboardCard;