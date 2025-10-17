import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import Submit from "./Submit";

function Home() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to Rowvember 🚣‍♂️</h1>
      <p>
        Visit the <a href="/admin">Admin Dashboard</a> to manage entries.
      </p>
      <p>
        Or go to the <a href="/submit">Public Submission Page</a> to log your meters.
      </p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/submit" element={<Submit />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
