import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Calendar from "@/components/Calendar";

function Page() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = getUser();
  return isAuthenticated() ? (
    <main>
      <Calendar user={user} />
    </main>
  ) : (
    redirect("/sign-in")
  );
}

export default Page;
