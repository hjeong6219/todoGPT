"use client";
import Link from "next/link";
import Login from "../components/Login";
import Image from "next/image";

function Page() {
  return (
    // <div className="flex flex-row w-full h-screen">
    //   <div className="flex flex-col w-1/2 border-r-2 h-max min-h-max bg-stone-200">
    //     <div>Take your todo app to the next level</div>
    //     <div className="max-w-screen-xl mx-auto">
    //       <div className="border mockup-window bg-base-300">
    //         <Image src={require("")} alt="demo" />
    //       </div>
    //     </div>
    //     <div className="flex w-1/2 h-max"></div>
    //   </div>
    // </div>
    //   <div className="w-full px-32 pt-40 pb-20 text-center bg-stone-50">
    //     <p className="text-4xl text-sky-400">Welcome to TodoGPT</p>
    //     <p className="text-4xl text-sky-400">
    //       Your Personal Todo Application with AI Assistant for Productivity!
    //     </p>
    //   </div>
    //   <div className="flex-col justify-center w-full bg-blue-200">
    //     <div className="max-w-6xl px-10 py-20 mx-auto text-xl ">
    //       <p className="text-3xl text-purple-800">With TodoGPT, you can:</p>
    //       <p className="text-2xl font-semibold text-blue-800">
    //         Manage Your Tasks:
    //       </p>
    //       Keep track of your to-do list effortlessly. Add, edit, or delete tasks
    //       with just a few clicks or voice commands.
    //       <p className="text-2xl font-semibold text-blue-800">
    //         Smart Prioritization:
    //       </p>
    //       Let AI help you prioritize your tasks based on deadlines, importance,
    //       and dependencies. No more guessing what to tackle first.
    //       <p className="text-2xl font-semibold text-blue-800">
    //         Customized Scheduling:
    //       </p>
    //       Our AI understands your preferences. It can create a personalized
    //       schedule that optimizes your productivity, considering your peak hours
    //       and commitments.
    //       <p className="text-2xl font-semibold text-blue-800">
    //         Task Reminders:
    //       </p>
    //       Never forget an important task again. Receive timely reminders and
    //       notifications to keep you on track.
    //       <p className="text-2xl font-semibold text-blue-800">
    //         Natural Language Interaction:
    //       </p>
    //       Interact with your AI assistant naturally. Just tell it what you need,
    //       and it will understand and assist.
    //       <p className="text-2xl font-semibold text-blue-800">
    //         Stay Organized:
    //       </p>
    //       Categorize tasks, tag them, and organize your to-do list your way.
    //       Your AI assistant adapts to your workflow.
    //     </div>
    //   </div>
    //   <div className="w-full px-32 py-20 text-center bg-stone-50">
    //     <p className="text-4xl text-sky-400">Join us now!</p>
    //     <Link href="/todos">Let's get started!</Link>
    //   </div>
    // </div>
    <div className="fixed w-full h-full">
      <div className="flex">
        <div className="flex flex-col items-center justify-center w-full h-screen overflow-y-auto bg-gradient-to-tr pb-96 no-scrollbar from-stone-100 from-10% via-70% to-90% via-red-100 to-red-200">
          <div className="w-4/5 text-5xl text-center text-stone-600">
            Take your productivity to the next level <br /> with an AI
            Assistant!
          </div>

          <div className="p-2 mt-8 text-2xl border-2 border-spacing-y-12 border-stone-600">
            <Link href="/dashboard">Let's get started!</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
