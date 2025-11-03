import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [totals, setTotals] = useState({ FD: 0, PD: 0 });

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    const { data, error } = await supabase
      .from("rowvember_entries")
      .select("id, name, meters, notes, created_at, updated_at")
      .order("meters", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    const cleaned = (data || []).map((e) => ({
      ...e,
      meters: Number(e.meters || 0),
      team:
        (e.notes || "").trim().toUpperCase() === "PD"
          ? "PD"
          : (e.notes || "").trim().toUpperCase() === "FD"
          ? "FD"
          : "OTHER",
    }));

    const t = cleaned.reduce(
      (acc, e) => {
        if (e.team === "FD") acc.FD += e.meters;
        else if (e.team === "PD") acc.PD += e.meters;
        return acc;
      },
      { FD: 0, PD: 0 }
    );

    setEntries(cleaned);
    setTotals(t);
  }

  const maxMeters = Math.max(1, ...entries.map((e) => e.meters));
  const fmtNum = (n) => n.toLocaleString();
  const fmtDate = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="mx-auto max-w-xl p-4 text-center text-white">
      <h1 className="text-2xl font-bold mb-2">🔥 WHRowvember 2025 👮‍♂️</h1>
      <h2 className="text-lg mb-4">Fire & Police Challenge</h2>

      {/* Totals */}
      <div className="flex justify-between mb-4">
        <div className="border border-red-500/50 rounded-lg p-2 w-[48%]">
          <div className="text-sm opacity-80">🔥 Fire Dept Total</div>
          <div className="text-2xl font-semibold text-red-400">
            {fmtNum(totals.FD)} m
          </div>
        </div>
        <div className="border border-blue-500/50 rounded-lg p-2 w-[48%]">
          <div className="text-sm opacity-80">👮‍♂️ Police Dept Total</div>
          <div className="text-2xl font-semibold text-blue-400">
            {fmtNum(totals.PD)} m
          </div>
        </div>
      </div>

      {/* Leaderboard table */}
      <table className="w-full text-left text-sm">
        <thead className="border-b border-white/20 text-xs uppercase">
          <tr>
            <th className="py-2">Rank</th>
            <th className="py-2">Name</th>
            <th className="py-2">Meters</th>
            <th className="py-2">Notes</th>
            <th className="py-2">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, idx) => {
            const pct = Math.max(0, Math.min(100, Math.round((e.meters / maxMeters) * 100)));
            return (
              <tr key={e.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-2">{idx + 1}</td>
                <td className="py-2">{e.name}</td>
                <td className="py-2">{fmtNum(e.meters)}</td>
                <td className="py-2">{e.notes || "-"}</td>
                <td className="py-2">{fmtDate(e.updated_at || e.created_at)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Progress bars */}
      <div className="mt-6 text-sm">
        {entries.map((e) => {
          const pct = Math.round((e.meters / maxMeters) * 100);
          return (
            <div key={e.id} className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span>{e.name}</span>
                <span>{fmtNum(e.meters)} m</span>
              </div>
              <div className="h-2 bg-white/10 rounded">
                <div
                  className={`h-2 rounded ${
                    e.team === "PD" ? "bg-blue-500" : "bg-red-500"
                  }`}
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
