import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Memory from "@/lib/memory";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.title || !body.caption || !body.imageUrl) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const newMemory = await Memory.create(body);
    return NextResponse.json(newMemory, { status: 201 });
  } catch (error) {
    console.error("Memory upload error:", error);
    return NextResponse.json({ message: "Failed to save memory", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const memories = await Memory.find().sort({ createdAt: -1 });

    return NextResponse.json(memories, { status: 200 });
  } catch (error) {
    console.error("Memory fetch error:", error);
    return NextResponse.json({ message: "Failed to fetch memories", error }, { status: 500 });
  }
}
