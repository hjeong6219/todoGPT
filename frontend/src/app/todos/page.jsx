"use client";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import TodoBoard from "@/components/todo/TodoBoard";
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
      <TodoBoard />
      <Toaster />
    </main>
  );
}

export default Page;
