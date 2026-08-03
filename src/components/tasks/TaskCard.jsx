"use client";

import EditTaskModal from "./EditTaskModal";
import DeleteTaskDialog from "./DeleteTaskDialog";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function TaskCard({
  task,
  onRefresh,
}) {
  return (
    <Card className="shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

      <CardContent className="p-5">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5">

          {/* Left Side */}
          <div className="flex-1 space-y-3">

            <h3 className="text-xl font-semibold wrap-break-word">
              {task.title}
            </h3>

            <p className="text-gray-600 wrap-break-word">
              {task.description || "No description provided."}
            </p>

            <div className="flex flex-wrap gap-2">

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {task.status}
              </span>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                {task.priority}
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                📅 {task.due_date || "No Due Date"}
              </span>

            </div>

          </div>

          {/* Right Side */}
          <div className="flex flex-wrap gap-2 lg:flex-col">

            <EditTaskModal
              task={task}
              onTaskUpdated={onRefresh}
            />

            <DeleteTaskDialog
              taskId={task.id}
              onTaskDeleted={onRefresh}
            />

          </div>

        </div>

      </CardContent>

    </Card>
  );
}