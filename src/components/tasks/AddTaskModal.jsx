"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";
import { createTask } from "@/services/taskService";
import { getProjects } from "@/services/projectService";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function AddTaskModal({ onTaskAdded }) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    project_id: "",
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    due_date: "",
  });

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  async function fetchProjects() {
    const { data } = await getProjects(user.id);

    if (data) {
      setProjects(data);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const { error } = await createTask({
      ...formData,
      user_id: user.id,
    });

    setLoading(false);

    if (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }

    setFormData({
      project_id: "",
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      due_date: "",
    });

    setOpen(false);

    if (onTaskAdded) {
      onTaskAdded();
    }

    toast.success("Task added successfully!");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          + Add Task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <Label>Project</Label>

            <Select
              value={formData.project_id}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  project_id: value,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>

              <SelectContent>
                {projects.map((project) => (
                  <SelectItem
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Task Title</Label>

            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Task Title"
              required
            />
          </div>

          <div>
            <Label>Description</Label>

            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task Description"
            />
          </div>

          <div>
            <Label>Status</Label>

            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  status: value,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Pending">
                  Pending
                </SelectItem>

                <SelectItem value="In Progress">
                  In Progress
                </SelectItem>

                <SelectItem value="Completed">
                  Completed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Priority</Label>

            <Select
              value={formData.priority}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  priority: value,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Low">
                  Low
                </SelectItem>

                <SelectItem value="Medium">
                  Medium
                </SelectItem>

                <SelectItem value="High">
                  High
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Due Date</Label>

            <Input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Task"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}