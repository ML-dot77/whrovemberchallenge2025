import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
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

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <h1>🔥 WHRowvember 2025 👮‍♂️</h1>
        <h2>Fire & Police Challenge</h2>
      </header>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Meters</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.meters}</td>
                <td>{entry.notes || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No entries yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      <a href="/" className="back-link">
        ⬅️ Back to Home
      </a>
    </div>
  );
}
