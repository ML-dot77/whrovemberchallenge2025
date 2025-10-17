import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sjsxuggvmvkpugdempcg.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
    <div style={{ maxWidth: "600px", margin: "2rem auto", textAlign: "center" }}>
      <h1>Rowvember Submission Form 🚣‍♂️</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Meters Rowed"
          value={meters}
          onChange={(e) => setMeters(e.target.value)}
          required
        />
        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="3"
        />
        <button type="submit" style={{ padding: "0.75rem", cursor: "pointer" }}>
          Submit
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      <p style={{ marginTop: "2rem" }}>
        <a href="/">🏠 Back to Home</a>
      </p>
    </div>
  );
}
