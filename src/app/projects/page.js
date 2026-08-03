"use client";

import { useState } from "react";

import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import AddProjectModal from "@/components/projects/AddProjectModal";
import ProjectCard from "@/components/projects/ProjectCard";

import useProjects from "@/hooks/useProjects";

export default function ProjectsPage() {
  const {
    projects,
    loading,
    fetchProjects,
  } = useProjects();

  const [sidebarOpen, setSidebarOpen] = useState(false);

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

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

              <div>
                <h1 className="text-3xl font-bold">
                  Projects
                </h1>

                <p className="mt-2 text-gray-500">
                  Manage all your projects in one place.
                </p>
              </div>

              <AddProjectModal
                onProjectAdded={fetchProjects}
              />

            </div>

            {loading ? (

              <div className="py-10 text-center">
                Loading Projects...
              </div>

            ) : projects.length === 0 ? (

              <div className="rounded-xl bg-white p-10 text-center shadow text-gray-500">
                No Projects Found
              </div>

            ) : (

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onRefresh={fetchProjects}
                  />
                ))}

              </div>

            )}

          </section>

        </div>

      </main>
    </ProtectedRoute>
  );
}