import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import VarkiTest from "./pages/VarkiTest";
import MatchingScreen from "./pages/MatchingScreen";
import Home from "./pages/Home";
import Evaluation from "./pages/Evaluation";
import Notice from "./pages/Notice";
import Evaluate from "./pages/Evaluate";
import Profile from "./pages/Profile";
import Classroom from "./pages/Classroom";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/roleselection" element={<RoleSelection />} />
          <Route path="/varkitest" element={<VarkiTest />} />
          <Route path="/matchingscreen" element={<MatchingScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/evaluate/:id" element={<Evaluate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
