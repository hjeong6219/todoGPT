"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";

function Page() {
  useSession({
    required: true,
    onUnauthenticated() {
      return redirect("/api/auth/signin?callbackUrl=/dashboard");
    },
  });

  return (
    <main>
      <Dashboard />
    </main>
  );
}

export default Page;
