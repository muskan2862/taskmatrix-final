"use client";

import EditProjectModal from "./EditProjectModal";
import DeleteProjectDialog from "./DeleteProjectDialog";

import { Card, CardContent } from "@/components/ui/card";

export default function ProjectCard({
  project,
  onRefresh,
}) {
  return (
    <Card className="shadow-md hover:shadow-lg transition">

      <CardContent className="p-5">

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-xl font-bold">
              {project.name}
            </h2>

            <p className="mt-2 text-gray-600">
              {project.description}
            </p>

          </div>

          <div className="flex gap-2">

            <EditProjectModal
              project={project}
              onProjectUpdated={onRefresh}
            />

            <DeleteProjectDialog
              projectId={project.id}
              onProjectDeleted={onRefresh}
            />

          </div>

        </div>

      </CardContent>

    </Card>
  );
}