"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      href: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Tasks",
      href: "/tasks",
      icon: ListTodo,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6 shrink-0">

      <h1 className="text-3xl font-bold mb-10">
        TaskMatrix
      </h1>

      <nav className="space-y-2">

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                pathname === link.href
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              <span>{link.name}</span>
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}