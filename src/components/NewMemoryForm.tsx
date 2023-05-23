"use client";

import { MediaPicker } from "@/components/MediaPicker";
import { Camera } from "lucide-react";
import { toBase64 } from "@/app/lib/toBase64";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function NewMemoryForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get("coverUrl") as File;

    const base64img = await toBase64(fileToUpload);

    const uploadResponse = await fetch("/api/uploadFile", {
      method: "POST",
      body: JSON.stringify({ base64img, contentType: fileToUpload.type }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { imageUrl } = await uploadResponse.json();

    await fetch("/api/memories", {
      method: "POST",
      body: JSON.stringify({
        coverUrl: imageUrl,
        content: formData.get("content"),
        isPublic: formData.get("isPublic"),
      }),
    });

    router.push("/");
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker />
      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className={`inline-block self-end rounded-full bg-pink-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-pink-400 ${
          isLoading ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Carregando..." : "Salvar"}
      </button>
    </form>
  );
}
