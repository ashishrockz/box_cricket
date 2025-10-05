"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Rooms</h2>
      <div className="space-y-3">
        {rooms.map((r) => (
          <div key={r._id} className="p-4 bg-white rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">ID: {r.roomId}</div>
                <div className="text-sm text-slate-600">Owner: {r.ownerName || "Guest"}</div>
                <div className="text-sm text-slate-600">Tournament: {r.isTournament ? "Yes" : "No"}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500">Status: {r.status}</div>
                <div className="text-sm">Invite: {r.inviteCode}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
