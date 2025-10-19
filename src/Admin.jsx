import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Admin() {
  const [entries, setEntries] = useState([]);
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ name: "", meters: "", notes: "" });

  // 🔐 You can change this anytime
  const ADMIN_PASSWORD = "rowvember2025";

  useEffect(() => {
    if (isAuthed) fetchEntries();
  }, [isAuthed]);

  async function fetchEntries() {
    const { data, error } = await supabase
      .from("rowvember_entries")
      .select("*")
      .order("meters", { ascending: false });
    if (!error) setEntries(data);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this entry?")) return;
    await supabase.from("rowvember_entries").delete().eq("id", id);
    fetchEntries();
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    await supabase.from("rowvember_entries").update(editData).eq("id", editing);
    setEditing(null);
    fetchEntries();
  }

  if (!isAuthed) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem", color: "white" }}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid gray" }}
        />
        <br />
        <button
          style={{
            marginTop: "1rem",
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            background: "darkred",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            if (password === ADMIN_PASSWORD) setIsAuthed(true);
            else alert("Incorrect password");
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        color: "white",
        backgroundColor: "#111",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Admin Dashboard</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#222",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead style={{ background: "#333" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Meters</th>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Notes</th>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              {editing === entry.id ? (
                <>
                  <td>
                    <input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editData.meters}
                      onChange={(e) => setEditData({ ...editData, meters: e.target.value })}
                                       onChange={(e) =>
                        setEditData({ ...editData, notes: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={handleEditSubmit}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ padding: "8px", border: "1px solid #333" }}>{entry.name}</td>
                  <td style={{ padding: "8px", border: "1px solid #333" }}>{entry.meters}</td>
                  <td style={{ padding: "8px", border: "1px solid #333" }}>{entry.notes}</td>
                  <td style={{ padding: "8px", border: "1px solid #333" }}>
                    <button
                      onClick={() => {
                        setEditing(entry.id);
                        setEditData({
                          name: entry.name,
                          meters: entry.meters,
                          notes: entry.notes || "",
                        });
                      }}
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
