"use client";
import Bubble from "@/components/Bubble";
import Loader from "../../components/Loader";
import TodoSkeleton from "@/components/todo/TodoSkeleton";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Weather from "@/components/dashboard/Weather";

function Page() {
  const { data: session, status } = useSession();
  console.log(status);
  if (status == "loading") return <Loader>Page is loading</Loader>;

  // if (status == "unauthenticated") {
  //   redirect("/api/auth/signin?callbackUrl=/test");
  // }

  if (status == "authenticated") {
    return (
      <>
        <div>
          <p>{session?.user?.name}</p>
          <TodoSkeleton />
          <Bubble />
          <Weather />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </>
    );
  }

  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default Page;
