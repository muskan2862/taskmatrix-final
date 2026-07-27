"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getTasks } from "@/services/taskService";

export default function RecentTasks({ search = "" }) {
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

    const { data } = await getTasks(user.id);

    if (data) {
      setTasks(data);
    }

    setLoading(false);
  }

  const filteredTasks = tasks
    .filter((task) =>
      task.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .slice(0, 5);

  function statusColor(status) {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-orange-100 text-orange-700";
    }
  }

  function priorityColor(priority) {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Tasks
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-gray-500">
          No Tasks Found.
        </p>
      ) : (
        <div className="space-y-4">

          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="border rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">

                <div>

                  <h3 className="font-semibold text-lg">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Project :
                    {" "}
                    {task.projects?.name || "No Project"}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Due :
                    {" "}
                    {task.due_date
                      ? new Date(
                          task.due_date
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>

                </div>

                <div className="flex flex-col gap-2">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}