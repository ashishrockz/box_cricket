"use client";

export default function LiveScoreBoard({ liveUpdate }: { liveUpdate: any }) {
  if (!liveUpdate) {
    return (
      <div className="p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">Live Updates</h3>
        <div className="text-sm text-slate-500">No live updates yet</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold mb-2">Live Updates</h3>
      {liveUpdate.type === "score" && (
        <div>
          <div className="font-medium">Score Update</div>
          <pre className="text-xs mt-2 bg-slate-50 p-2 rounded">{JSON.stringify(liveUpdate.data, null, 2)}</pre>
        </div>
      )}
      {liveUpdate.type === "toss" && (
        <div>
          <div className="font-medium">Toss</div>
          <pre className="text-xs mt-2 bg-slate-50 p-2 rounded">{JSON.stringify(liveUpdate.data, null, 2)}</pre>
        </div>
      )}
      {liveUpdate.type === "end" && (
        <div>
          <div className="font-medium">Match End</div>
          <pre className="text-xs mt-2 bg-slate-50 p-2 rounded">{JSON.stringify(liveUpdate.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
