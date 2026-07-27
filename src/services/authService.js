import { supabase } from "@/lib/supabase";

// Register User
export const signUp = async (name, email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  return { data, error };
};

// Login User
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

// Logout User
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  return { error };
};

// Current Logged-in User
export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

// Get Current Session
export const getSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};