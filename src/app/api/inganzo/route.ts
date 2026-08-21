import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const language = searchParams.get("language");
  const search = searchParams.get("search");
  const limit = searchParams.get("limit");

  const where: Record<string, unknown> = {};

  if (type) where.type = type.toUpperCase();
  if (language) where.language = language;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { author: { contains: search, mode: "insensitive" } },
    ];
  }

  const works = await prisma.inganzo.findMany({
    where,
    orderBy: { date: "desc" },
    ...(limit ? { take: Number(limit) } : {}),
  });

  return NextResponse.json(works);
}
