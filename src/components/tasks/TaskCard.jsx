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
    <Card className="shadow-md hover:shadow-lg transition">

      <CardContent className="p-5">

        <div className="flex justify-between items-start">

          <div className="space-y-2">

            <h3 className="text-lg font-semibold">
              {task.title}
            </h3>

            <p className="text-gray-600">
              {task.description}
            </p>

            <div className="flex gap-3 flex-wrap">

              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                {task.status}
              </span>

              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                {task.priority}
              </span>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                📅 {task.due_date}
              </span>

            </div>

          </div>

          <div className="flex gap-2">

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