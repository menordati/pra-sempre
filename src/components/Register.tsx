import { SignUpButton } from "@clerk/nextjs";
import { User } from "lucide-react";

export function Register() {
  return (
    <SignUpButton mode="modal">
      <button className="cursor-pointer flex items-center gap-3 text-left transition-colors hover:text-gray-50">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
          <User className="h-5 w-5 text-gray-500" />
        </div>

        <p className="max-w-[140px] text-sm leading-snug">
          <span className="underline">Crie sua conta</span> e eternize memórias!
        </p>
      </button>
    </SignUpButton>
  );
}
