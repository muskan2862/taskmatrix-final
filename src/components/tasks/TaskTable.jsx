"use client";

import TaskCard from "./TaskCard";

export default function TaskTable({
  tasks,
  loading,
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        Loading Tasks...
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        No Tasks Found
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