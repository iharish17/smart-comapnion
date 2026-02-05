import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [neurotype, setNeurotype] = useState("ADHD");
  const [detailLevel, setDetailLevel] = useState("High");
  const [fontPreference, setFontPreference] = useState("Lexend");
  const [sensoryMode, setSensoryMode] = useState("Calm");

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter your name!");
      return;
    }

    const profile = {
      name: name.trim(),
      neurotype,
      detailLevel,
      fontPreference,
      sensoryMode,
    };

    localStorage.setItem("smart_profile", JSON.stringify(profile));
    navigate("/task");
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Smart Companion 🧠</h2>
        <p className="subtitle">
          Set up your profile so tasks feel easier and calmer.
        </p>

        <label className="label">Your Name</label>
        <input
          className="input"
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="label">Neurotype</label>
        <select
          className="select"
          value={neurotype}
          onChange={(e) => setNeurotype(e.target.value)}
        >
          <option>ADHD</option>
          <option>Autism</option>
          <option>Dyslexia</option>
          <option>General</option>
        </select>

        <label className="label">Step Detail Level</label>
        <select
          className="select"
          value={detailLevel}
          onChange={(e) => setDetailLevel(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label className="label">Font Preference</label>
        <select
          className="select"
          value={fontPreference}
          onChange={(e) => setFontPreference(e.target.value)}
        >
          <option>Lexend</option>
          <option>Arial</option>
          <option>OpenDyslexic</option>
        </select>

        <label className="label">Sensory Mode</label>
        <select
          className="select"
          value={sensoryMode}
          onChange={(e) => setSensoryMode(e.target.value)}
        >
          <option>Calm</option>
          <option>Bright</option>
          <option>Minimal</option>
        </select>

        <button className="btn btn-primary" onClick={handleSave}>
          Save Profile & Continue →
        </button>

        <p className="smallNote">
          Privacy Note: Your profile is stored locally on your device only.
        </p>
      </div>
    </div>
  );
};

export default ProfileSetup;
