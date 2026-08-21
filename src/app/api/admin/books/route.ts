import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const books = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const book = await prisma.book.create({ data: body });
    return NextResponse.json(book, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
