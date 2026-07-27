"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getProjects } from "@/services/projectService";

export default function useProjects() {
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    if (!user) return;

    setLoading(true);

    const { data, error } = await getProjects(user.id);

    if (!error) {
      setProjects(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  return {
    projects,
    loading,
    fetchProjects,
  };
}