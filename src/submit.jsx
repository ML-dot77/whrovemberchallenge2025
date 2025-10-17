import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://sjsxuggvmvkpugdempcg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqc3h1Z2d2bXZrcHVnZGVtcGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MjU1OTAsImV4cCI6MjA3MzIwMTU5MH0.TgxrNz2DcPE0qsDFX7OWgQFZNR_ydOGcbk7W3haZWWs"
);

export default function Submit() {
  const [name, setName] = useState("");
  const [meters, setMeters] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("rowvember_entries")
      .insert([{ name, meters: parseInt(meters), notes }]);

    if (error) {
      setMessage("❌ Error submitting entry: " + error.message);
    } else {
      setMessage("✅ Entry submitted successfully!");
      setName("");
      setMeters("");
      setNotes("");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Rowvember Public Submission</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "inline-block",
          textAlign: "left",
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Meters:</label>
          <br />
          <input
            type="number"
            value={meters}
            onChange={(e) => setMeters(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Notes:</label>
          <br />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}
