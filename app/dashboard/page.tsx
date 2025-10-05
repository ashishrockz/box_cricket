"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import socket from "@/lib/socket";

import Link from "next/link";
import TournamentForm from "@/components/TournamentForm";
import LiveScoreBoard from "@/components/LiveScoreBoard";

export default function DashboardPage() {
  const [stats, setStats] = useState<{ users?: number; rooms?: number; matches?: number } | null>(null);
  const [liveUpdate, setLiveUpdate] = useState<any>(null);

  useEffect(() => {
    fetchDashboard();

    socket.on("score-update", (data: any) => setLiveUpdate({ type: "score", data }));
    socket.on("toss-update", (data: any) => setLiveUpdate({ type: "toss", data }));
    socket.on("match-end", (data: any) => setLiveUpdate({ type: "end", data }));

    return () => {
      socket.off("score-update");
      socket.off("toss-update");
      socket.off("match-end");
    };
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">🏏 Admin Dashboard</h1>
        <div className="flex gap-3">
          <Link href="/dashboard/rooms" className="p-2 bg-white rounded shadow">Rooms</Link>
          <Link href="/dashboard/matches" className="p-2 bg-white rounded shadow">Matches</Link>
          <Link href="/dashboard/users" className="p-2 bg-white rounded shadow">Users</Link>
        </div>
      </header>

      <section className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">Users: {stats?.users ?? "—"}</div>
        <div className="p-4 bg-white rounded shadow">Rooms: {stats?.rooms ?? "—"}</div>
        <div className="p-4 bg-white rounded shadow">Matches: {stats?.matches ?? "—"}</div>
      </section>

      <section className="grid grid-cols-2 gap-6">
        <TournamentForm />
        <LiveScoreBoard liveUpdate={liveUpdate} />
      </section>
    </div>
  );
}
