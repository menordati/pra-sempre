import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { z } from "zod";
import { auth } from "@clerk/nextjs";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id");

  console.log(userId);

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const memories = await prisma.memory.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const memoriesRes = memories.map((memory) => {
    return {
      id: memory.id,
      coverUrl: memory.coverUrl,
      excerpt: memory.content.substring(0, 115).concat("..."),
    };
  });

  return NextResponse.json(memoriesRes);
}

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

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
      userId,
    },
  });

  return NextResponse.json(memory);
}
