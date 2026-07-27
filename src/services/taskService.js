import { supabase } from "@/lib/supabase";

/* ===========================
   GET TASKS
=========================== */

export const getTasks = async (userId) => {
  const { data, error } = await supabase
    .from("tasks")
    .select(`
      *,
      projects(name)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
};

/* ===========================
   CREATE TASK
=========================== */

export const createTask = async (task) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert([task])
    .select();

  return { data, error };
};

/* ===========================
   UPDATE TASK
=========================== */

export const updateTask = async (id, updatedTask) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(updatedTask)
    .eq("id", id)
    .select();

  return { data, error };
};

/* ===========================
   DELETE TASK
=========================== */

export const deleteTask = async (id) => {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  return { error };
};