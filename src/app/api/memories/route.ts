import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { z } from "zod";

export async function GET() {
  const memories = await prisma.memory.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const memoriesRes = memories.map((memory) => {
    return {
      id: memory.id,
      coverUrl: memory.coverUrl,
      execerpt: memory.content.substring(0, 115).concat("..."),
    };
  });

  return NextResponse.json(memoriesRes);
}

export async function POST(request: Request) {
  const res = await request.json();

  const bodySchema = z.object({
    content: z.string(),
    coverUrl: z.string(),
    isPublic: z.coerce.boolean().default(false),
  });

  const { content, coverUrl, isPublic } = bodySchema.parse(res);

  const memory = await prisma.memory.create({
    data: {
      content,
      coverUrl,
      isPublic,
      userId: "343434",
    },
  });

  return NextResponse.json(memory);
}
