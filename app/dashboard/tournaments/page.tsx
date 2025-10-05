"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import TournamentForm from "@/components/TournamentForm";
import TournamentList from "@/components/TournamentList";
import { toast } from "react-toastify";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);

  const fetchTournaments = async () => {
    try {
      const res = await api.get("/tournaments");
      setTournaments(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch tournaments");
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🏆 Tournaments</h2>
      <TournamentForm onCreated={fetchTournaments} />
      <TournamentList tournaments={tournaments} />
    </div>
  );
}
