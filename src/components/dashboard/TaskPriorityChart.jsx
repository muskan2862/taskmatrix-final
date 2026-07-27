"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getTasks } from "@/services/taskService";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function TaskPriorityChart() {
  const { user } = useAuth();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  async function loadData() {
    const { data: tasks } = await getTasks(user.id);

    if (!tasks) return;

    const low = tasks.filter(
      (task) => task.priority === "Low"
    ).length;

    const medium = tasks.filter(
      (task) => task.priority === "Medium"
    ).length;

    const high = tasks.filter(
      (task) => task.priority === "High"
    ).length;

    setData([
      {
        priority: "Low",
        count: low,
      },
      {
        priority: "Medium",
        count: medium,
      },
      {
        priority: "High",
        count: high,
      },
    ]);
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-5">
        Task Priority
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="priority" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}