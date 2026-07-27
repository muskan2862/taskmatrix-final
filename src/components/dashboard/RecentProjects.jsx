"use client";

import AddProjectModal from "@/components/projects/AddProjectModal";
import ProjectCard from "@/components/projects/ProjectCard";

import useProjects from "@/hooks/useProjects";

export default function RecentProjects() {
  const {
    projects,
    loading,
    fetchProjects,
  } = useProjects();

  return (
    <section className="mt-10">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          Projects
        </h2>

        <AddProjectModal
          onProjectAdded={fetchProjects}
        />

      </div>

      {loading ? (
        <p className="mt-6">
          Loading...
        </p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">

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
  );
}