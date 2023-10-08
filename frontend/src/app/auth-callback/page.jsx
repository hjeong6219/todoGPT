"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useAddUserMutation,
  useGetUserByEmailQuery,
} from "../features/todo/usersApi";
import { useEffect, useRef, useState } from "react";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  const userEmail = searchParams.get("userEmail");
  const userName = searchParams.get("userName");
  const [userAdded, setUserAdded] = useState(false);

  const [addUser, { isLoading: isLoadingUserAdd, error: errorUserAdd }] =
    useAddUserMutation();

  const { data, isLoading: isLoadingUser } = useGetUserByEmailQuery(userEmail);

  const checkAuthentication = async () => {
    try {
      if (!isLoadingUser && !userAdded && data === undefined) {
        await addUser({ email: userEmail, fullName: userName });
        setUserAdded(true);
      }
    } catch (errorUserAdd) {
      console.error("Failed to add user");
      router.push("/sign-in");
    }
  };

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      checkAuthentication();
      router.push(origin ? `/${origin}` : "/todos");
      console.log("pushing to origin");
    }
  }, []);

  if (isLoadingUserAdd) {
    return <div>Setting up your account...</div>;
  }
  if (errorUserAdd) {
    return <div>There was an error setting up your account.</div>;
  }
}

export default Page;
