"use client";

import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import AddProjectModal from "@/components/projects/AddProjectModal";
import ProjectTable from "@/components/projects/ProjectTable";

import useProjects from "@/hooks/useProjects";

export default function ProjectsPage() {
  const {
    projects,
    loading,
    fetchProjects,
  } = useProjects();

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen bg-gray-100">

        <Sidebar />

        <div className="flex-1">

          <Navbar />

          <section className="p-8">

            <div className="flex justify-between items-center mb-8">

              <div>

                <h1 className="text-3xl font-bold">
                  Projects
                </h1>

                <p className="text-gray-500 mt-2">
                  Manage all your projects here.
                </p>

              </div>

              <AddProjectModal
                onProjectAdded={fetchProjects}
              />

            </div>

            <ProjectTable
              projects={projects}
              loading={loading}
              onRefresh={fetchProjects}
            />

          </section>

        </div>

      </main>
    </ProtectedRoute>
  );
}