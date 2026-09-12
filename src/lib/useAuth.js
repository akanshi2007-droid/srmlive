"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

// Without Supabase configured there's no account system at all - every page
// just behaves as if no one is logged in, which matches how the rest of the
// app degrades gracefully (see src/lib/events.js).
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function signOut() {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  }

  return { user, loading, signOut, isSupabaseConfigured };
}
