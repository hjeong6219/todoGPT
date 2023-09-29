"use client";

// import dynamic from "next/dynamic";
// import "../globals.css";

// const App = dynamic(() => import("../../App"), { ssr: false });

// export default function Page() {
//   return <App />;
// }

import React, { useEffect, useState } from "react";

function page() {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5050/api/home")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.people);
      });
  }, []);
  return (
    <div>
      {message.map((j, k) => (
        <div key={k}>{j}</div>
      ))}
    </div>
  );
}

export default page;
