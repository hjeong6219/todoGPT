import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    console.log(email, password);
  } catch (error) {
    return {
      status: 400,
      body: {
        error: error.message,
      },
    };
  }
  return NextResponse.json({ message: "success" });
}
