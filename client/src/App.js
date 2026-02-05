import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProfileSetup from "./pages/ProfileSetup.jsx";
import TaskInput from "./pages/TaskInput.jsx";
import TaskRunner from "./pages/TaskRunner.jsx";
import Completed from "./pages/Completed.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileSetup />} />
        <Route path="/task" element={<TaskInput />} />
        <Route path="/run" element={<TaskRunner />} />
        <Route path="/completed" element={<Completed />} />
      </Routes>
    </Router>
  );
};

export default App;
