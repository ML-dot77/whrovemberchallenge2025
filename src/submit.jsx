import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
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
    if (error) setMessage("❌ Error: " + error.message);
    else {
      setMessage("✅ Entry submitted!");
      setName("");
      setMeters("");
      setNotes("");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Rowvember Submission 🛶</h1>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
        <label>Name:</label><br />
        <input value={name} onChange={(e) => setName(e.target.value)} required /><br /><br />
        <label>Meters:</label><br />
        <input type="number" value={meters} onChange={(e) => setMeters(e.target.value)} required /><br /><br />
        <label>Notes (optional):</label><br />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} /><br /><br />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
