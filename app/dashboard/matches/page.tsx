"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await api.get("/matches");
      setMatches(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Matches</h2>
      <div className="space-y-3">
        {matches.map((m) => (
          <div key={m._id} className="p-4 bg-white rounded shadow flex justify-between">
            <div>
              <div className="font-medium">Match ID: {m._id}</div>
              <div className="text-sm text-slate-600">Room: {m.roomId}</div>
            </div>
            <div className="flex gap-2 items-center">
              <Link href={`/dashboard/matches/${m._id}`} className="p-2 bg-blue-600 text-white rounded">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
