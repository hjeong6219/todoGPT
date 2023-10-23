import Loader from "../../components/Loader";
import TodoSkeleton from "@/components/todo/TodoSkeleton";

function Page() {
  return (
    <div>
      <Loader />
      <TodoSkeleton />
    </div>
  );
}

export default Page;
