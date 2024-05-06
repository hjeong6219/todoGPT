"use client";
import { redirect } from "next/navigation";
import Calendar from "@/components/calendar/Calendar";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";

function Page() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return redirect("/api/auth/signin?callbackUrl=/calendar");
    },
  });

  if (status == "loading") return;
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <Loader>Loading the calendar...</Loader>;
  </div>;
  return (
    <main>
      <Calendar />
    </main>
  );
}

export default Page;
