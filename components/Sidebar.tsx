"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUsername(JSON.parse(user).username);
  }, []);

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/tournaments", label: "Tournaments" },
    { href: "/dashboard/rooms", label: "Rooms" },
    { href: "/dashboard/matches", label: "Matches" },
    { href: "/dashboard/users", label: "Users" }
  ];

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-white border-r h-screen p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6 text-blue-700">🏏 Cricket Admin</h2>
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block p-2 rounded hover:bg-blue-50 ${
                  pathname === link.href ? "bg-blue-100 font-medium" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t pt-4">
        <div className="text-sm text-gray-600 mb-2">Logged in as {username}</div>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white rounded p-2 hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
