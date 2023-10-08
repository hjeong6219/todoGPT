"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetUserByEmailQuery } from "../features/todo/usersApi";

function Page() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, isLoading, isError, error } = useGetUserByEmailQuery(
    "example@example.com"
  );

  const checkAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/check", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        router.push(origin ? `/${origin}` : "/todos");
      } else {
        router.push("/sign-in");
      }
    } catch (error) {
      console.error(error);
      router.push("/sign-in");
    }
  };

  checkAuthentication();

  return <div>Setting up your account...</div>;
}

export default Page;
