import TodoList from "../../components/TodoList";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

function Page() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = getUser();
  return isAuthenticated() ? (
    <div>
      <TodoList user={user} />
    </div>
  ) : (
    redirect("/sign-in")
  );
}

export default Page;
