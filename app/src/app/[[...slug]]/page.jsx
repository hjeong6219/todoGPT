"use client";

import dynamic from "next/dynamic";
import "../globals.css";

const App = dynamic(() => import("../../App"), { ssr: false });

export default function Page() {
  return <App />;
}
