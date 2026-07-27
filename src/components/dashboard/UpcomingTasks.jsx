"use client";

import { CalendarDays } from "lucide-react";

export default function UpcomingTasks({ tasks = [] }) {
  const today = new Date();

  // End date = 7 days from today
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const upcomingTasks = tasks
    .filter((task) => {
      if (!task.due_date) return false;

      const dueDate = new Date(task.due_date);

      return dueDate >= today && dueDate <= nextWeek;
    })
    .sort(
      (a, b) =>
        new Date(a.due_date) - new Date(b.due_date)
    )
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-5">
        Upcoming Deadlines
      </h2>

      {upcomingTasks.length === 0 ? (
        <p className="text-gray-500">
          No upcoming tasks.
        </p>
      ) : (
        <div className="space-y-4">
          {upcomingTasks.map((task) => (
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

              <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                <CalendarDays size={16} />
                {new Date(task.due_date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}