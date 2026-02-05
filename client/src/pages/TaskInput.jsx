import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskInput = () => {
  const navigate = useNavigate();

  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("Friend");

  const suggestions = [
    "Clean my room",
    "Study for 1 hour",
    "Organize my desk",
    "Workout for 15 minutes",
    "Prepare for exam",
  ];

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("smart_profile"));

    if (!profile) {
      navigate("/");
      return;
    }

    if (profile.name) {
      setUserName(profile.name);
    }
  }, [navigate]);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const profile = JSON.parse(localStorage.getItem("smart_profile"));

      const res = await fetch("/api/decompose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, profile }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong!");
        setLoading(false);
        return;
      }

      localStorage.setItem("smart_task", JSON.stringify(data));
      navigate("/run");
    } catch (err) {
      console.log(err);
      alert("Backend not responding!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Hello, {userName} ✨</h2>
        <p className="subtitle">
          What large task is on your mind today? Let's break it down.
        </p>

        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="textarea"
          rows="3"
          placeholder="e.g., Organize my desk..."
          disabled={loading}
        />

        <div className="chips">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setTask(s)}
              className="chip"
              disabled={loading}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={!task.trim() || loading}
          className={`btn btn-primary ${
            !task.trim() || loading ? "disabledBtn" : ""
          }`}
        >
          {loading ? "Generating..." : "Generate Micro Wins⚡"}
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
