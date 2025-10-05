"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import api from "@/lib/api";
import socket from "@/lib/socket";

export default function MatchMonitor() {
  const [match, setMatch] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    if (!id) return;
    fetchMatch();
    socket.emit("join-room", { roomId: id });
    socket.on("score-update", (data) => {
      // optional merging logic
      setEvents((prev) => [data, ...prev]);
    });
    socket.on("toss-update", (d) => {});
    return () => {
      socket.off("score-update");
      socket.off("toss-update");
    };
  }, [id]);

  const fetchMatch = async () => {
    try {
      const res = await api.get(`/matches/${id}`);
      setMatch(res.data);
      setEvents(res.data.events || []);
    } catch (err) {
      console.error(err);
    }
  };

  if (!match) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-3">Match Monitor</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-medium">Score</h3>
          <pre className="text-xs mt-2 bg-slate-50 p-2 rounded">{JSON.stringify(match.score, null, 2)}</pre>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-medium">Toss</h3>
          <div className="text-sm mt-2">{JSON.stringify(match.toss || {}, null, 2)}</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white rounded shadow">
        <h3 className="font-medium mb-2">Events (most recent first)</h3>
        <div className="space-y-2">
          {events.map((e: any, idx: number) => (
            <div key={idx} className="p-2 border rounded text-sm">
              <div className="font-medium">Over {e.over}.{e.ballInOver}</div>
              <div>Runs: {e.run} — Wicket: {String(e.wicket)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
