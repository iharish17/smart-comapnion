import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskRunner = () => {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const [loadingOverwhelm, setLoadingOverwhelm] = useState(false);
  const [microSteps, setMicroSteps] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("smart_task"));

    if (!saved) {
      navigate("/task");
      return;
    }

    setTaskData(saved);
  }, [navigate]);

  // Loading UI
  if (!taskData) {
    return (
      <div className="page">
        <div className="card">
          <h2 className="title">Loading...</h2>
          <p className="subtitle">Preparing your Micro-Wins...</p>
        </div>
      </div>
    );
  }

  // Safety check
  if (!taskData.steps || !Array.isArray(taskData.steps) || taskData.steps.length === 0) {
    return (
      <div className="page">
        <div className="card">
          <h2 className="title">Error ⚠️</h2>
          <p className="subtitle">Task steps missing. Generate again.</p>

          <button className="btn btn-primary" onClick={() => navigate("/task")}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const step = taskData.steps[currentStep];
  const progress = ((currentStep + 1) / taskData.total_steps) * 100;

  const handleDone = () => {
    if (currentStep === taskData.steps.length - 1) {
      let streak = parseInt(localStorage.getItem("smart_streak") || "0");
      streak += 1;
      localStorage.setItem("smart_streak", streak);
      navigate("/completed");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // ✅ OVERWHELM FUNCTION
  const handleOverwhelm = async () => {
    try {
      setLoadingOverwhelm(true);

      const profile = JSON.parse(localStorage.getItem("smart_profile"));

      const res = await fetch("/api/overwhelm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stepText: step.text,
          profile,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Backend Error: " + (data.error || "Something went wrong"));
        setLoadingOverwhelm(false);
        return;
      }

      if (!data.micro_steps || !Array.isArray(data.micro_steps)) {
        alert("Invalid response from AI.");
        setLoadingOverwhelm(false);
        return;
      }

      setMicroSteps(data.micro_steps);
      setShowModal(true);
      setLoadingOverwhelm(false);
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Check console.");
      setLoadingOverwhelm(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">{taskData.title}</h2>
        <p className="subtitle">
          Step {currentStep + 1} of {taskData.total_steps}
        </p>

        <div className="progressBar">
          <div className="progressFill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="stepBox">
          <p className="stepText">{step.text}</p>
          <p className="stepTime">
            ⏱ Estimated: {step.estimated_time_minutes} min
          </p>
        </div>

        <div className="row">
          <button className="btn btn-success" onClick={handleDone}>
            Done ✅
          </button>

          <button className="btn btn-secondary" onClick={handleDone}>
            Skip ➡️
          </button>
        </div>

        <button
          className="btn btn-purple"
          onClick={handleOverwhelm}
          disabled={loadingOverwhelm}
        >
          {loadingOverwhelm ? "Breaking it down..." : "Break it down more 🧠"}
        </button>

        <p className="smallNote">
          Tip: Focus only on this one step. No need to rush.
        </p>
      </div>

      {/* ✅ MODAL */}
      {showModal && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h2 className="modalTitle">Micro Steps 🧩</h2>
            <p className="modalSubtitle">
              Here’s a smaller breakdown of this step:
            </p>

            <div className="microStepsList">
              {microSteps.map((m, i) => (
                <div key={i} className="microStepItem">
                  <p className="microText">
                    {i + 1}. {m.text}
                  </p>
                  <p className="microTime">
                    ⏱ {m.estimated_time_minutes} min
                  </p>
                </div>
              ))}
            </div>

            <button className="btn btn-primary" onClick={() => setShowModal(false)}>
              Close ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskRunner;
