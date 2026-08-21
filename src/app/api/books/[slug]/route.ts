import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const book = await prisma.book.findUnique({
    where: { slug },
  });

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}
