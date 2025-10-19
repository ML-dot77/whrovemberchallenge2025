// --- Fire & Police Challenge homepage version ---
// You can always revert by restoring the previous commit in GitHub if needed.

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Submit from "./Submit.jsx";
import Leaderboard from "./Leaderboard.jsx";

function Home() {
  return (
    <div
      style={{
        padding: "3rem",
        textAlign: "center",
        color: "white",
        background: "linear-gradient(180deg, #111 0%, #000 100%)",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        🔥 WHRowvember 2025 👮‍♂️
      </h1>
      <h2 style={{ marginBottom: "2rem" }}>Fire & Police Challenge</h2>
      <p style={{ marginBottom: "3rem", fontSize: "1.1rem" }}>
        Compete, log your meters, and see who climbs to the top of the leaderboard!
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <a
          href="/submit"
          style={{
            background: "linear-gradient(to right, red, darkred)",
            color: "white",
            textDecoration: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            fontWeight: "bold",
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          🚣 Submit Meters
        </a>

        <a
          href="/leaderboard"
          style={{
            background: "linear-gradient(to right, blue, navy)",
            color: "white",
            textDecoration: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            fontWeight: "bold",
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          🏆 View Leaderboard
        </a>
      </div>
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
