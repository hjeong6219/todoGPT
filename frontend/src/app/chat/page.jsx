import ChatInput from "@/components/chat/ChatInput";

function Page() {
  return (
    <div className="absolute inset-0 z-50 items-center justify-center w-2/5 max-w-screen-xl m-auto overflow-x-hidden overflow-y-auto shadow-lg h-3/5 rounded-xl bg-stone-50 border-stone-400 focus:outline-none">
      <div className="flex h-full ">
        <section className="relative flex items-stretch flex-1 h-full py-2 text-2xl resize-none scrollbar-hide focus:outline-none bg-stone-50 text-stone-900">
          Hi
        </section>
        <ChatInput />
      </div>
    </div>
  );
}

export default Page;
