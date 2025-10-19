import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Admin() {
  const [entries, setEntries] = useState([]);
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ name: "", meters: "", notes: "" });

  const ADMIN_PASSWORD = "rowvember2025"; // 🔐 you can change this anytime

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
    await supabase
      .from("rowvember_entries")
      .update(editData)
      .eq("id", editing);
    setEditing(null);
    fetchEntries();
  }

  if (!isAuthed) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          style={{ marginTop: "1rem" }}
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
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Meters</th>
            <th>Notes</th>
            <th>Actions</th>
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
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editData.meters}
                      onChange={(e) =>
                        setEditData({ ...editData, meters: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editData.notes}
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
                  <td>{entry.name}</td>
                  <td>{entry.meters}</td>
                  <td>{entry.notes}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditing(entry.id);
                        setEditData({
                          name: entry.name,
                          meters: entry.meters,
                          notes: entry.notes || "",
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(entry.id)}>
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
