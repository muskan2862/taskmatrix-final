import { supabase } from "@/lib/supabase";

/* ===========================
   GET ALL PROJECTS
=========================== */

export const getProjects = async (userId) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
};

/* ===========================
   CREATE PROJECT
=========================== */

export const createProject = async (project) => {
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select();

  return { data, error };
};

/* ===========================
   UPDATE PROJECT
=========================== */

export const updateProject = async (id, updatedProject) => {
  const { data, error } = await supabase
    .from("projects")
    .update(updatedProject)
    .eq("id", id)
    .select();

  return { data, error };
};

/* ===========================
   DELETE PROJECT
=========================== */

export const deleteProject = async (id) => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  return { error };
};