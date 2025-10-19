import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Admin() {
  const [test, setTest] = useState("✅ Admin page is rendering!");

  useEffect(() => {
    console.log("Admin test mounted");
  }, []);

  return (
    <div style={{ padding: "3rem", color: "black", backgroundColor: "white", minHeight: "100vh" }}>
      <h1>Admin Test Page</h1>
      <p>{test}</p>
      <p>If you can read this, React is working fine.</p>
    </div>
  );
}
