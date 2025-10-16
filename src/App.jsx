
import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default function App() {
  const [name, setName] = useState("")
  const [meters, setMeters] = useState("")
  const [leaderboard, setLeaderboard] = useState([])

  async function fetchData() {
    const { data, error } = await supabase.from("submissions").select("*")
    if (error) {
      console.error(error)
      return
    }
    const totals = {}
    data.forEach(row => {
      const key = (row.name || "").trim()
      if (!key) return
      totals[key] = (totals[key] || 0) + Number(row.meters || 0)
    })
    setLeaderboard(
      Object.entries(totals)
        .map(([n, m]) => ({ name: n, meters: m }))
        .sort((a, b) => b.meters - a.meters)
    )
  }

  useEffect(() => {
    fetchData()
    const channel = supabase
      .channel('public:submissions')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'submissions' },
        () => fetchData()
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const cleanName = name.trim()
    const value = parseInt(meters, 10)
    if (!cleanName || !Number.isFinite(value) || value <= 0) return
    const { error } = await supabase.from("submissions").insert([{ name: cleanName, meters: value }])
    if (error) { console.error(error); return }
    setMeters("")
  }

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 16, fontFamily: "sans-serif" }}>
      <h1>Rowvember 🚣‍♂️</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <input
          type="number"
          inputMode="numeric"
          placeholder="Meters rowed"
          value={meters}
          onChange={(e) => setMeters(e.target.value)}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <button type="submit" style={{ width: "100%", padding: 10 }}>Submit</button>
      </form>

      <h2 style={{ marginTop: 24 }}>Leaderboard</h2>
      <ol>
        {leaderboard.map((row, i) => (
          <li key={i}>{row.name}: {row.meters} m</li>
        ))}
      </ol>
    </div>
  )
}
