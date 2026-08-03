"use client";

import { Menu } from "lucide-react";

import LogoutButton from "@/components/auth/LogoutButton";
import { useAuth } from "@/context/AuthContext";

export default function Navbar({ setSidebarOpen }) {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between bg-white shadow px-4 md:px-8 py-4">

      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        <h2 className="text-xl md:text-2xl font-bold">
          Dashboard
        </h2>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* Hide email on very small screens */}
        <span className="hidden sm:block font-medium text-sm md:text-base">
          {user?.email}
        </span>

        <LogoutButton />

      </div>

    </header>
  );
}