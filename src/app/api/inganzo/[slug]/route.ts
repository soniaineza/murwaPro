import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const work = await prisma.inganzo.findUnique({
    where: { slug },
  });

  if (!work) {
    return NextResponse.json({ error: "Inganzo not found" }, { status: 404 });
  }

  return NextResponse.json(work);
}
