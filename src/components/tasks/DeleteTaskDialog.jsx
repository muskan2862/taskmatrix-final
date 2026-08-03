"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { deleteTask } from "@/services/taskService";
import { toast } from "sonner";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function DeleteTaskDialog({
  taskId,
  onTaskDeleted,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    const { error } = await deleteTask(taskId);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setOpen(false);

    if (onTaskDeleted) {
      onTaskDeleted();
    }

    toast.success("Task deleted successfully!");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <Button
            variant="destructive"
            size="icon"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        }
      />

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Delete Task
          </DialogTitle>
        </DialogHeader>

        <p className="text-gray-600">
          Are you sure you want to delete this task?
        </p>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}