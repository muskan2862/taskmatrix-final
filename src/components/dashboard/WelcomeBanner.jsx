"use client";

import { useAuth } from "@/context/AuthContext";

export default function WelcomeBanner() {
  const { user } = useAuth();

  const name =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <section className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white shadow-lg">
      <h1 className="text-3xl font-bold">
        Welcome, {name} 👋
      </h1>

      <p className="mt-2 text-blue-100">
        Manage your projects and tasks efficiently with TaskMatrix.
      </p>
    </section>
  );
}