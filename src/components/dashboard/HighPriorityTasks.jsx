"use client";

import { AlertTriangle } from "lucide-react";

export default function HighPriorityTasks({ tasks = [] }) {
  const highPriorityTasks = tasks
    .filter((task) => task.priority === "High")
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-5">
        High Priority Tasks
      </h2>

      {highPriorityTasks.length === 0 ? (
        <p className="text-gray-500">
          No high priority tasks.
        </p>
      ) : (
        <div className="space-y-4">
          {highPriorityTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between border-b pb-3 last:border-b-0"
            >
              <div>
                <h3 className="font-semibold">
                  {task.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {task.projects?.name || "No Project"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <AlertTriangle
                  size={16}
                  className="text-red-500"
                />

                <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium">
                  High
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}