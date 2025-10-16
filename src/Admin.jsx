import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Admin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data, error } = await supabase.from("submissions").select("*");
    if (error) console.error(error);
    else setRows(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this row?")) return;
    const { error } = await supabase.from("submissions").delete().eq("id", id);
    if (error) console.error(error);
    else fetchData();
  }

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Rowvember Admin Dashboard 🧭</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Meters</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.meters}</td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDelete(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
