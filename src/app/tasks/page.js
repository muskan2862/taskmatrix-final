"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskTable from "@/components/tasks/TaskTable";
import TaskFilters from "@/components/tasks/TaskFilters";
import ExportCSV from "@/components/tasks/ExportCSV";
import ExportPDF from "@/components/tasks/ExportPDF";

import { useAuth } from "@/context/AuthContext";
import useTasks from "@/hooks/useTasks";
import { getProjects } from "@/services/projectService";

export default function TasksPage() {
  const { user } = useAuth();

  const { tasks, loading, fetchTasks } = useTasks();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [projects, setProjects] = useState([]);

  const [project, setProject] = useState("All");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

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

  const filteredTasks = tasks.filter((task) => {
    const projectMatch =
      project === "All" ||
      task.project_id === project;

    const statusMatch =
      status === "All" ||
      task.status === status;

    const priorityMatch =
      priority === "All" ||
      task.priority === priority;

    return (
      projectMatch &&
      statusMatch &&
      priorityMatch
    );
  });

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen bg-gray-100">

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col">

          <Navbar
            setSidebarOpen={setSidebarOpen}
          />

          <section className="flex-1 p-6 md:p-8">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

              <div>
                <h1 className="text-3xl font-bold">
                  Task Management
                </h1>

                <p className="mt-2 text-gray-500">
                  Manage all your tasks here.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">

                <ExportCSV
                  tasks={filteredTasks}
                />

                <ExportPDF
                  tasks={filteredTasks}
                />

                <AddTaskModal
                  onTaskAdded={fetchTasks}
                />

              </div>

            </div>

            <TaskFilters
              projects={projects}
              project={project}
              setProject={setProject}
              status={status}
              setStatus={setStatus}
              priority={priority}
              setPriority={setPriority}
            />

            <TaskTable
              tasks={filteredTasks}
              loading={loading}
              onRefresh={fetchTasks}
            />

          </section>

        </div>

      </main>
    </ProtectedRoute>
  );
}