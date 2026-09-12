"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, UserPlus, Sparkles } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [redirectTo, setRedirectTo] = useState("/");
  const [mode, setMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | error | check-email
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRedirectTo(params.get("redirect") || "/");
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="container-page py-16 max-w-md text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-paper-muted">
          <Sparkles className="h-6 w-6 text-signal" />
        </div>
        <h1 className="font-display font-black text-3xl mb-2">Almost there</h1>
        <p className="text-ink-soft">
          Login needs Supabase connected first. Add your Supabase URL and anon
          key to <code className="rounded bg-paper-muted px-1.5 py-0.5">.env.local</code>{" "}
          (see the README), then this page comes to life.
        </p>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setStatus("error");
        setErrorMessage(error.message);
        return;
      }
      router.push(redirectTo);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setStatus("error");
        setErrorMessage(error.message);
        return;
      }
      setStatus("check-email");
    }
  }

  if (status === "check-email") {
    return (
      <div className="container-page py-16 max-w-md text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-live/20">
          <Sparkles className="h-6 w-6 text-live" />
        </div>
        <h1 className="font-display font-black text-3xl mb-2">Check your inbox</h1>
        <p className="text-ink-soft">
          We've sent a confirmation link to <strong>{email}</strong>. Confirm
          it, then come back and log in.
        </p>
      </div>
    );
  }

  return (
    <div className="container-page py-14 sm:py-20 max-w-md">
      <div className="rounded-3xl border-2 border-line p-7 sm:p-9 shadow-[6px_6px_0_0_#13141A0d]">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-signal/10">
          {mode === "signin" ? (
            <LogIn className="h-5 w-5 text-signal" />
          ) : (
            <UserPlus className="h-5 w-5 text-signal" />
          )}
        </div>

        <h1 className="font-display font-black text-3xl sm:text-4xl mb-1">
          {mode === "signin" ? "Welcome back" : "Join SRMlive"}
        </h1>
        <p className="text-ink-soft mb-8">
          {mode === "signin"
            ? "Log in to post and manage your events."
            : "Set up an account to start posting events for your club."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="block text-sm font-medium mb-1.5">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@srmist.edu.in"
              className="input rounded-xl"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1.5">Password</span>
            <input
              required
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="input rounded-xl"
            />
          </label>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            data-cursor-hover
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper transition-all duration-200 hover:bg-signal hover:-translate-y-0.5 disabled:opacity-60"
          >
            {mode === "signin" ? (
              <LogIn className="h-4 w-4" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
            {status === "submitting"
              ? "Please wait…"
              : mode === "signin"
              ? "Log in"
              : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-ink-soft">
          {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setStatus("idle");
              setErrorMessage("");
            }}
            className="font-medium text-signal hover:underline"
          >
            {mode === "signin" ? "Create an account" : "Log in instead"}
          </button>
        </p>
      </div>

      <p className="mt-4 text-center">
        <Link href="/" className="text-sm text-ink-soft hover:text-ink">
          ← Back to SRMlive
        </Link>
      </p>
    </div>
  );
}
