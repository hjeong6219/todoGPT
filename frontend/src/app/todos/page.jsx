"use client";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";
import { Toaster } from "react-hot-toast";

function Page() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return redirect("/api/auth/signin?callbackUrl=/todos");
    },
  });

  return (
    <main>
      <Dashboard />
      <Toaster />
    </main>
  );
}

export default Page;
