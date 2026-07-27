"use client";

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
                  Manage all your projects in one place.
                </p>
              </div>

              <AddProjectModal
                onProjectAdded={fetchProjects}
              />

            </div>

            {loading ? (

              <div className="text-center py-10">
                Loading Projects...
              </div>

            ) : projects.length === 0 ? (

              <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
                No Projects Found
              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

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