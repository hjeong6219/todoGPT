import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

function page() {
  return (
    <div className="w-full h-screen bg-stone-100">
      <div className="w-full px-32 pt-40 pb-20 text-center bg-stone-50">
        <p className="text-4xl text-sky-400">Welcome to TodoGPT</p>
        <p className="text-4xl text-sky-400">
          Your Personal Todo Application with AI Assistant for Productivity!
        </p>
      </div>
      <div className="flex-col justify-center w-full bg-blue-200">
        <div className="max-w-6xl px-10 py-20 mx-auto text-xl ">
          <p className="text-3xl text-purple-800">With TodoGPT, you can:</p>
          <p className="text-2xl font-semibold text-blue-800">
            Manage Your Tasks:
          </p>
          Keep track of your to-do list effortlessly. Add, edit, or delete tasks
          with just a few clicks or voice commands.
          <p className="text-2xl font-semibold text-blue-800">
            Smart Prioritization:
          </p>
          Let AI help you prioritize your tasks based on deadlines, importance,
          and dependencies. No more guessing what to tackle first.
          <p className="text-2xl font-semibold text-blue-800">
            Customized Scheduling:
          </p>
          Our AI understands your preferences. It can create a personalized
          schedule that optimizes your productivity, considering your peak hours
          and commitments.
          <p className="text-2xl font-semibold text-blue-800">
            Task Reminders:
          </p>
          Never forget an important task again. Receive timely reminders and
          notifications to keep you on track.
          <p className="text-2xl font-semibold text-blue-800">
            Natural Language Interaction:
          </p>
          Interact with your AI assistant naturally. Just tell it what you need,
          and it will understand and assist.
          <p className="text-2xl font-semibold text-blue-800">
            Stay Organized:
          </p>
          Categorize tasks, tag them, and organize your to-do list your way.
          Your AI assistant adapts to your workflow.
        </div>
      </div>
      <div className="w-full px-32 py-20 text-center bg-stone-50">
        <p className="text-4xl text-sky-400">Join us now!</p>
        <button className="px-3 py-2 my-5 text-2xl text-blue-800 rounded-xl bg-sky-300">
          <LoginLink>Let's get started!</LoginLink>
        </button>
      </div>
    </div>
  );
}

export default page;
