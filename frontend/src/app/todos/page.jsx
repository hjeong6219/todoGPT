import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";

function Page() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = getUser();
  return isAuthenticated() ? (
    <main>
      <Dashboard user={user} />
    </main>
  ) : (
    redirect("/sign-in")
  );
}

export default Page;
