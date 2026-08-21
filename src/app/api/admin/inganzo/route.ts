import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const works = await prisma.inganzo.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(works);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const work = await prisma.inganzo.create({ data: body });
    return NextResponse.json(work, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
