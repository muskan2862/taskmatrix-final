"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { getProjects } from "@/services/projectService";
import { getTasks } from "@/services/taskService";

export default function ProjectProgress() {
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  async function fetchData() {
    const { data: projectData } = await getProjects(user.id);
    const { data: taskData } = await getTasks(user.id);

    if (projectData) setProjects(projectData);
    if (taskData) setTasks(taskData);
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        Project Progress
      </h2>

      {projects.length === 0 ? (
        <p className="text-gray-500">
          No projects found.
        </p>
      ) : (
        <div className="space-y-6">
          {projects.map((project) => {
            const projectTasks = tasks.filter(
              (task) => task.project_id === project.id
            );

            const completed = projectTasks.filter(
              (task) => task.status === "Completed"
            ).length;

            const total = projectTasks.length;

            const percentage =
              total === 0
                ? 0
                : Math.round((completed / total) * 100);

            return (
              <div key={project.id}>
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">
                    {project.name}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {percentage}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {completed} of {total} tasks completed
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}