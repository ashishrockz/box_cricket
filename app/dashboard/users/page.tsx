"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
      <div className="space-y-2">
        {users.map((u) => (
          <div key={u._id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>
              <div className="font-medium">{u.displayName || u.username}</div>
              <div className="text-sm text-slate-600">Role: {u.role}</div>
            </div>
            <div className="text-sm text-slate-500">Matches: {u.stats?.matches ?? 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
