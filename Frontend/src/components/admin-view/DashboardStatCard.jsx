import React from "react";

const DashboardStatCard = ({ title, value, icon, bgColor }) => {
  return (
    <div
      className={`rounded-xl p-5 flex items-center justify-between shadow-sm border ${bgColor}`}
    >
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
      </div>

      <div className="text-3xl opacity-80"> 
        {icon}
      </div>
    </div>
  );
};

export default DashboardStatCard;
