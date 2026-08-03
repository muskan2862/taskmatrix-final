"use client";

import { ClipboardList } from "lucide-react";

import TaskCard from "./TaskCard";

export default function TaskTable({
  tasks,
  loading,
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="grid gap-5">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-xl bg-white p-6 shadow"
          >
            <div className="mb-4 h-5 w-1/3 rounded bg-gray-200"></div>

            <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>

            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>

            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl bg-white p-12 shadow text-center">

        <div className="flex justify-center mb-4">

          <ClipboardList
            size={60}
            className="text-gray-400"
          />

        </div>

        <h2 className="text-2xl font-semibold">
          No Tasks Found
        </h2>

        <p className="mt-2 text-gray-500">
          Create your first task to start managing your work.
        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-5">

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onRefresh={onRefresh}
        />
      ))}

    </div>
  );
}