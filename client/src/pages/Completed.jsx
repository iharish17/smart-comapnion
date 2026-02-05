import React from "react";
import { useNavigate } from "react-router-dom";

const Completed = () => {
  const navigate = useNavigate();
  const streak = localStorage.getItem("smart_streak") || 0;

  return (
    <div className="page">
      <div className="card centerText">
        <h1 className="title">🎉 Task Completed!</h1>
        <p className="subtitle">
          Great job. You finished your Micro-Wins today.
        </p>

        <div className="badgeBox">
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            🔥 Streak: {streak} days
          </p>
          <p style={{ marginTop: "8px", color: "#b6b6c5", fontSize: "14px" }}>
            Badge Earned: Consistency Star ⭐
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => navigate("/task")}>
          Start New Task →
        </button>
      </div>
    </div>
  );
};

export default Completed;
