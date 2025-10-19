import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Admin() {
  const [test, setTest] = useState("Page loaded");

  useEffect(() => {
    console.log("Admin component mounted");
  }, []);

  return (
    <div style={{ padding: "3rem", color: "white", backgroundColor: "black" }}>
      <h1>Admin Test Page</h1>
      <p>{test}</p>
    </div>
  );
}
