import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Cricket Admin Panel",
  description: "Admin Dashboard for Cricket Tournament System",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
