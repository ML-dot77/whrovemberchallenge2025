import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./Leaderboard.css";

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("rowvember_entries")
        .select("name, meters, notes")
        .order("meters", { ascending: false });

      if (!error && data) setEntries(data);
    }
    fetchData();
  }, []);

  // Assign medals for top 3
  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "";
  };

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <h1>🔥 WHRowvember 2025 👮‍♂️</h1>
        <h2>Fire & Police Challenge</h2>
      </header>

      {/* 🏆 Table Leaderboard */}
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Meters</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <tr key={index}>
                <td>{getMedal(index) || index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.meters.toLocaleString()}</td>
                <td>{entry.notes || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No entries yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 📊 Bar Chart Visualization */}
      {entries.length > 0 && (
        <div className="chart-section">
          <h3>🏁 Meters Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={entries} margin={{ top: 20, right: 30, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="meters" fill="#e63946" name="Meters Rowed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <a href="/" className="back-link">⬅️ Back to Home</a>
    </div>
  );
}
