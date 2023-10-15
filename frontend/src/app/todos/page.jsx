import Header from "@/components/Header";
import TodoList from "../../components/todo/TodoList";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

function Page() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = getUser();
  return isAuthenticated() ? (
    <main>
      <TodoList user={user} />
    </main>
  ) : (
    redirect("/sign-in")
  );
}

export default Page;
