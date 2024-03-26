"use client";

import { redirect } from "next/navigation";

function RegistrationForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    console.log(response);
  };
  const handleClick = () => {
    redirect("/login");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Register</button>
      </form>
      <button onClick={handleClick}>reidrect</button>
    </>
  );
}

export default RegistrationForm;
