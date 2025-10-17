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
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🚣 Rowvember Submission</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ margin: "0.5rem", padding: "0.5rem" }}
        />
        <input
          type="number"
          placeholder="Meters"
          value={meters}
          onChange={(e) => setMeters(e.target.value)}
          required
          style={{ margin: "0.5rem", padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ margin: "0.5rem", padding: "0.5rem" }}
        />
        <br />
        <button type="submit" style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
          Submit Entry
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      <a href="/" style={{ display: "block", marginTop: "2rem" }}>
        🔙 Back to Home
      </a>
    </div>
  );
}
