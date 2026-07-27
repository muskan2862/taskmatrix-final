"use client";

import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentProjects from "@/components/dashboard/RecentProjects";
import RecentTasks from "@/components/dashboard/RecentTasks";
import UpcomingTasks from "@/components/dashboard/UpcomingTasks";
import HighPriorityTasks from "@/components/dashboard/HighPriorityTasks";
import ProjectProgress from "@/components/dashboard/ProjectProgress";
import TaskStatusChart from "@/components/dashboard/TaskStatusChart";
import TaskPriorityChart from "@/components/dashboard/TaskPriorityChart";

import useTasks from "@/hooks/useTasks";
import { useState } from "react";
import SearchBar from "@/components/dashboard/SearchBar";


export default function DashboardPage() {

  const { tasks } = useTasks();
  const [search, setSearch] = useState("");

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100">

        <Sidebar />

        <div className="flex-1 flex flex-col">

          <Navbar />

          <main className="flex-1 p-8 space-y-8">

            <WelcomeBanner />


          <SearchBar
            search={search}
            setSearch={setSearch}
          />

            <StatsCard />

            <RecentProjects search={search} />

            <RecentTasks search={search} />

            <ProjectProgress />

            <div className="grid md:grid-cols-2 gap-6">

              <UpcomingTasks tasks={tasks} />

              <HighPriorityTasks tasks={tasks} />

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TaskStatusChart />
              <TaskPriorityChart />
            </div>

          </main>

        </div>

      </div>
    </ProtectedRoute>
  );
}