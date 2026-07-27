"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getTasks } from "@/services/taskService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#3B82F6", "#F59E0B", "#10B981"];

export default function TaskStatusChart() {
  const { user } = useAuth();

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (user) {
      fetchChartData();
    }
  }, [user]);

  async function fetchChartData() {
    const { data, error } = await getTasks(user.id);

    if (error || !data) return;

    const pending = data.filter(
      (task) => task.status === "Pending"
    ).length;

    const inProgress = data.filter(
      (task) => task.status === "In Progress"
    ).length;

    const completed = data.filter(
      (task) => task.status === "Completed"
    ).length;

    setChartData([
      {
        name: "Pending",
        value: pending,
      },
      {
        name: "In Progress",
        value: inProgress,
      },
      {
        name: "Completed",
        value: completed,
      },
    ]);
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        Task Status
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}