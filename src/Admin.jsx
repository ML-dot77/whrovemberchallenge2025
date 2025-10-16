import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Admin() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Supabase
  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    setLoading(true);
    const { data, error } = await supabase
      .from("rowvember_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setEntries(data);
    }
    setLoading(false);
  }

  async function deleteEntry(id) {
    const { error } = await supabase.from("rowvember_entries").delete().eq("id", id);
    if (error) alert("Error deleting entry: " + error.message);
    else fetchEntries();
  }

  // Calculate total meters
  const totalMeters = entries.reduce((sum, e) => sum + (e.meters || 0), 0);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Rowvember Admin Dashboard 🧮</h1>

      {loading && <p>Loading entries...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && (
        <>
          <h3>Total Meters Rowed: {totalMeters.toLocaleString()} m</h3>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={entries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="meters" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>

          {/* Data Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "2rem",
            }}
          >
            <thead>
              <tr style={{ background: "#f3f3f3" }}>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Meters</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {entry.name}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {entry.meters}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {new Date(entry.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
