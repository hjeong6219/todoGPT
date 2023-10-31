"use client";
import Navbar from "@/components/dashboard/Navbar";

import { useEffect, useState } from "react";

function Page() {
  const [user, setUser] = useState();
  const [authStatus, setAuthStatus] = useState(null);

  console.log(user);

  useEffect(() => {
    const getKindeSession = async () => {
      const res = await fetch("/api/kindeSession");
      const data = await res.json();
      setUser(data.user);
      setAuthStatus(data.authenticated);
    };

    getKindeSession();
  }, []);
  console.log(authStatus);
  return (
    <div className="flex h-screen bg-white">
      <div className="flex flex-col h-screen">
        <Navbar />
      </div>
      <div className="flex-1 mx-auto overflow-hidden max-w-screen-2xl">
        <main className="h-full p-4 overflow-y-auto">
          <section className="flex items-center justify-between px-4 py-8">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
            </div>
          </section>
          <section className="p-4 mb-6 bg-white rounded shadow-lg">
            <h2 className="text-xl font-bold text-gray-700">Welcome back!</h2>
            <p className="text-gray-600">
              Here's what's lined up for you today.
            </p>
          </section>
          <section className="p-4 mb-6 bg-gray-100 rounded shadow-lg">
            <h2 className="text-xl font-bold text-gray-700">
              Message of the Day
            </h2>
            <p className="text-gray-600">
              "Keep your spirits high, tackle everything with enthusiasm!"
            </p>
          </section>

          <section className="mb-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="p-4 bg-gray-100 rounded shadow-lg">
                <h3 className="text-lg font-bold text-gray-700">To-Do</h3>
                <p className="text-gray-600">
                  Tasks that need to be addressed.
                </p>
              </div>

              <div className="p-4 bg-gray-100 rounded shadow-lg">
                <h3 className="text-lg font-bold text-gray-700">In Progress</h3>
                <p className="text-gray-600">
                  Tasks you are currently working on.
                </p>
              </div>

              <div className="p-4 bg-gray-100 rounded shadow-lg">
                <h3 className="text-lg font-bold text-gray-700">Completed</h3>
                <p className="text-gray-600">
                  Tasks you have completed. Well done!
                </p>
              </div>
            </div>
          </section>

          <section className="p-4 mb-6 bg-gray-100 rounded shadow-lg">
            <h4 className="text-lg font-bold text-gray-700">Today's To-Dos</h4>
            <p className="text-gray-600">
              Tasks scheduled for today. Stay focused!
            </p>
          </section>

          <section className="p-4 bg-gray-100 rounded shadow-lg">
            <h4 className="text-lg font-bold text-gray-700">Upcoming To-Dos</h4>
            <p className="text-gray-600">
              Here's what's lined up for you. Plan ahead!
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Page;
