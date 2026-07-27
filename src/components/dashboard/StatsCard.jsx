"use client";

import { useEffect, useState } from "react";
import { FolderKanban, ListTodo, CheckCircle2, Clock3 } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { getProjects } from "@/services/projectService";
import { getTasks } from "@/services/taskService";

export default function StatsCard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  async function fetchStats() {
  const { data: projects, error: projectError } = await getProjects(user.id);
  const { data: tasks, error: taskError } = await getTasks(user.id);

  console.log("Projects:", projects);
  console.log("Project Error:", projectError);

  console.log("Tasks:", tasks);
  console.log("Task Error:", JSON.stringify(taskError, null, 2));
  const completed =
    tasks?.filter((task) => task.status === "Completed").length || 0;

  const pending =
    tasks?.filter((task) => task.status === "Pending").length || 0;

  setStats({
    projects: projects?.length || 0,
    tasks: tasks?.length || 0,
    completed,
    pending,
  });
}

  const cards = [
    {
      title: "Projects",
      value: stats.projects,
      icon: (
        <FolderKanban className="w-6 h-6 text-blue-600" />
      ),
    },
    {
      title: "Tasks",
      value: stats.tasks,
      icon: (
        <ListTodo className="w-6 h-6 text-green-600" />
      ),
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: (
        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
      ),
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: (
        <Clock3 className="w-6 h-6 text-orange-600" />
      ),
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between"
        >
          <div>
            <p className="text-gray-500 text-sm">
              {item.title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {item.value}
            </h2>
          </div>

          <div className="p-3 rounded-full bg-gray-100">
            {item.icon}
          </div>
        </div>
      ))}
    </section>
  );
}