"use client";

export default function Navbar() {
  return (
    <nav className="h-14 bg-white shadow flex items-center justify-between px-6">
      <h1 className="font-semibold text-lg">Admin Dashboard</h1>
      <div className="text-sm text-gray-600">
        {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
      </div>
    </nav>
  );
}
