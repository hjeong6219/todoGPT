"use client";

// import dynamic from "next/dynamic";
// import "../globals.css";

// const App = dynamic(() => import("../../App"), { ssr: false });

// export default function Page() {
//   return <App />;
// }

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "../../App";

const queryClient = new QueryClient();

function page() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default page;
