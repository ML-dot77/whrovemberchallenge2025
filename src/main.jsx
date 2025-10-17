import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Submit from "./Submit.jsx";
import Leaderboard from "./Leaderboard.jsx";

function Home() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🔥 React is Rendering</h1>
      <a href="/submit">Go to Submit Page</a>
      <br />
      <a href="/leaderboard">View Leaderboard</a>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
