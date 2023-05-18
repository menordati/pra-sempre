import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { z } from "zod";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const id = z.string().uuid().parse(params.slug);

  const memory = await prisma.memory.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return NextResponse.json(memory);
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const id = z.string().uuid().parse(params.slug);

  await prisma.memory.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ Deleted: "Ok" });
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const id = z.string().uuid().parse(params.slug);

  const res = await request.json();

  const bodySchema = z.object({
    content: z.string(),
    coverUrl: z.string(),
    isPublic: z.coerce.boolean().default(false),
  });

  const { content, coverUrl, isPublic } = bodySchema.parse(res);

  const memory = await prisma.memory.update({
    where: {
      id,
    },
    data: {
      content,
      coverUrl,
      isPublic,
    },
  });

  return NextResponse.json(memory);
}
