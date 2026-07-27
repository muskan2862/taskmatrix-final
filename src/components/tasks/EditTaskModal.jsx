"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { updateTask } from "@/services/taskService";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditTaskModal({
  task,
  onTaskUpdated,
}) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    status: task.status || "Pending",
    priority: task.priority || "Low",
    due_date: task.due_date || "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleUpdate(e) {
    e.preventDefault();

    setLoading(true);

    const { error } = await updateTask(
      task.id,
      formData
    );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setOpen(false);

    onTaskUpdated?.();

    alert("Task updated successfully!");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="icon"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        }
      />

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Edit Task
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleUpdate}
          className="space-y-4"
        >

          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task Title"
            required
          />

          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <Input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
          />

          <DialogFooter>

            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Updating..."
                : "Update Task"}
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  );
}