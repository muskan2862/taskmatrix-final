"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="relative w-full md:w-96">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />

      <input
        type="text"
        placeholder="Search projects or tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}