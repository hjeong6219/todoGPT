import Bubble from "@/components/Bubble";
import Loader from "../../components/Loader";
import TodoSkeleton from "@/components/todo/TodoSkeleton";

function Page() {
  return (
    <div>
      <Loader />
      <TodoSkeleton />
      <Bubble />
    </div>
  );
}

export default Page;
