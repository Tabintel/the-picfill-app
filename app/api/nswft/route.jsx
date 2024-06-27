// app/api/nsfw/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { img, key } = await req.json();

  try {
    const response = await axios.post(
      `https://api.pixlab.io/NSFW?key=${key}`,
      { img, key },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.response?.data?.message || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
