"use client";

import LogoutButton from "@/components/auth/LogoutButton";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="flex justify-between items-center bg-white shadow px-8 py-4">

      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-5">

        <span className="font-medium">
          {user?.email}
        </span>

        <LogoutButton />

      </div>

    </header>
  );
}