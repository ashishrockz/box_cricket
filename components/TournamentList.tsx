"use client";

export default function TournamentList({ tournaments }: { tournaments: any[] }) {
  if (!tournaments || tournaments.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow text-gray-500">
        No tournaments created yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tournaments.map((tournament) => (
        <div key={tournament._id} className="bg-white p-4 rounded shadow flex justify-between">
          <div>
            <div className="font-semibold text-blue-700">{tournament.name}</div>
            <div className="text-sm text-gray-600">
              {tournament.city} — {tournament.venue}
            </div>
            <div className="text-xs text-gray-500">
              {tournament.startDate?.slice(0, 10)} to {tournament.endDate?.slice(0, 10)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Type: {tournament.type}</div>
            <div className="text-xs text-gray-400">
              Matches: {tournament.matches?.length || 0}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
