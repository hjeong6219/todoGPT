"use client";
import Link from "next/link";
import {
  HiArrowLongRight,
  HiBolt,
  HiChartBar,
  HiArrowTrendingUp,
  HiMiniUsers,
} from "react-icons/hi2";

function Page() {
  return (
    <>
      <section className="w-full py-12 bg-gradient-to-r from-sky-500 to-blue-500 md:py-20 lg:py-28">
        <div className="container flex flex-col items-center justify-center max-w-screen-lg mx-auto text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl xl:text-7xl">
            Ready to revolutionize your productivity?
          </h1>
          <p className="max-w-4xl mt-6 text-lg text-gray-200 md:text-2xl">
            Leverage AI as Your Personal Assistant. <br />
            TodoGPT Simplifies Task Management and Boosts Your Productivity.
          </p>
          <div className="mt-10">
            <Link
              className="inline-flex items-center px-6 py-3 text-lg font-medium transition-colors bg-white rounded-md shadow-lg text-sky-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              href="/dashboard"
            >
              Get Started
              <HiArrowLongRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-20 lg:py-28">
        <div className="container flex flex-col items-center justify-center mx-auto space-y-16 text-center max-w-screen-2xl">
          <div className="space-y-2 md:pb-6">
            <h2 className="my-4 text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl xl:text-6xl">
              Why TodoGPT?
            </h2>
            <p className="mx-auto max-w-[800px] text-gray-500 md:text-2xl dark:text-gray-400">
              TodoGPT is a task management tool that leverages AI to help you
            </p>
          </div>
          <div className="grid gap-4 md:gap-8 lg:gap-12 sm:grid-cols-2">
            <div className="flex flex-col items-center space-y-2">
              <HiBolt className="flex-shrink-0 w-20 h-20" />
              <div className="space-y-2 text-center">
                <h3 className="font-bold">Enhanced Productivity</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Boost your productivity with AI-powered task management and
                  prioritization.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <HiChartBar className="flex-shrink-0 w-20 h-20" />
              <div className="space-y-2 text-center">
                <h3 className="font-bold">Dashboard</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Visualize your tasks and progress with our intuitive dashboard
                  and analytics.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <HiArrowTrendingUp className="flex-shrink-0 w-20 h-20" />
              <div className="space-y-2 text-center">
                <h3 className="font-bold">Performance Tracking</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Monitor your performance and identify areas for improvement
                  with our performance tracking tools.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <HiMiniUsers className="flex-shrink-0 w-20 h-20" />
              <div className="space-y-2 text-center">
                <h3 className="font-bold">User Experience</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enjoy a seamless user experience with our user-friendly
                  interface and intuitive features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 bg-gray-100 md:py-20 lg:py-28 dark:bg-gray-800">
        <div className="container flex flex-col items-center justify-center mx-auto space-y-10 text-center max-w-screen-2xl">
          <div className="space-y-2">
            <h2 className="pb-4 text-3xl font-bold tracking-tighter dark:text-gray-500 sm:text-5xl md:text-6xl">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl dark:text-gray-400">
              Have any questions or need help? <br />
              Don't hesitate to reach out.
            </p>
          </div>
          <div className="w-full max-w-md space-y-2">
            <form className="flex space-x-2">
              <input
                className="flex-1 max-w-lg px-3 py-1 text-xl border-gray-300 rounded-md dark:border-gray-700 focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50"
                placeholder="Enter your email"
                type="email"
              />
              <button
                className="px-6 py-2 text-lg text-gray-300 bg-black rounded-lg dark:text-gray-500 dark:bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
                type="submit"
              >
                Contact Us
              </button>
            </form>
            <p className="py-2 text-xs text-gray-500 dark:text-gray-400">
              We'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
