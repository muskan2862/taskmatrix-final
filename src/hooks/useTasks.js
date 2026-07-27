"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/services/taskService";

export default function useTasks() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  async function fetchTasks() {
    setLoading(true);

    const { data, error } = await getTasks(user.id);

    if (!error) {
      setTasks(data || []);
    }

    setLoading(false);
  }

  async function addTask(task) {
    const { error } = await createTask(task);

    if (!error) {
      fetchTasks();
    }

    return { error };
  }

  async function editTask(id, updatedTask) {
    const { error } = await updateTask(id, updatedTask);

    if (!error) {
      fetchTasks();
    }

    return { error };
  }

  async function removeTask(id) {
    const { error } = await deleteTask(id);

    if (!error) {
      fetchTasks();
    }

    return { error };
  }

  return {
    tasks,
    loading,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
  };
}