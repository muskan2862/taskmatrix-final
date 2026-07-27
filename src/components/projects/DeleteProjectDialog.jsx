"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteProject } from "@/services/projectService";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function DeleteProjectDialog({
  projectId,
  onProjectDeleted,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const { error } = await deleteProject(projectId);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setOpen(false);

    onProjectDeleted?.();

    toast.success("Project deleted successfully!");
  };

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
            Delete Project
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete this project?
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