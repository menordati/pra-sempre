import { EmptyMemories } from "@/components/EmptyMemories";
import { auth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

interface Memory {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
}

const apiURL = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return <EmptyMemories />;
  }

  const response = await fetch(`https://${apiURL}/api/memories`, {
    method: "GET",
    headers: {
      "X-User-ID": userId,
    },
  });

  const memories: Memory[] = await response.json();

  if (memories.length === 0) {
    return <EmptyMemories />;
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
            </time>
            <Image
              src={memory.coverUrl}
              alt=""
              width={592}
              height={280}
              className="aspect-video w-full rounded-lg object-cover"
            />
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>
            <Link
              href={`/memories/${memory.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
