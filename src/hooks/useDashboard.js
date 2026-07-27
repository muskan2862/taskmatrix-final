"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { getProjects } from "@/services/projectService";
import { getTasks } from "@/services/taskService";

export default function useDashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    completed: 0,
    pending: 0,
  });

  const [loading, setLoading] = useState(true);

  async function fetchDashboard() {
    if (!user) return;

    setLoading(true);

    const [{ data: projects }, { data: tasks }] = await Promise.all([
      getProjects(user.id),
      getTasks(user.id),
    ]);

    setStats({
      projects: projects?.length || 0,
      tasks: tasks?.length || 0,
      completed:
        tasks?.filter((task) => task.status === "Completed").length || 0,
      pending:
        tasks?.filter((task) => task.status === "Pending").length || 0,
    });

    setLoading(false);
  }

  useEffect(() => {
    fetchDashboard();
  }, [user]);

  return {
    stats,
    loading,
    fetchDashboard,
  };
}