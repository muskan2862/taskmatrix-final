"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function TaskFilters({
  status,
  setStatus,
  priority,
  setPriority,
}) {
  return (
    <div className="flex gap-4 mb-6">

      {/* Status Filter */}

      <Select
        value={status}
        onValueChange={setStatus}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="All">All Status</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="In Progress">
            In Progress
          </SelectItem>
          <SelectItem value="Completed">
            Completed
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Priority Filter */}

      <Select
        value={priority}
        onValueChange={setPriority}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="All">All Priority</SelectItem>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}