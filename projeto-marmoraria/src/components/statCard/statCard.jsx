import "./statCard.css";

function StatCard({ title, value, subtitle, subtitleUp, icon, tone = "blue" }) {
  return (
    <div className={`stat-card tone-${tone}`}>
      <div className="stat-card-top">
        <span className="stat-card-icon">{icon}</span>
        <span className="stat-card-title">{title}</span>
      </div>
      <h1>{value}</h1>
      <span className={`stat-card-sub ${subtitleUp === false ? "down" : "up"}`}>
        {subtitle}
      </span>
    </div>
  );
}

export default StatCard;
