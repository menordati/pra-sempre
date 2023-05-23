import "./globals.css";
import { ReactNode } from "react";
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from "next/font/google";
import { ClerkProvider, SignUpButton, UserButton, auth } from "@clerk/nextjs";
import { Hero } from "@/components/Hero";
import { Copyright } from "@/components/Copyright";
import { SignUp } from "@/components/SignUp";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });

const baiJamjuree = BaiJamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
});

export const metadata = {
  title: "PraSempre",
  description:
    "Preserve e compartilhe memórias inesquecíveis do relacionamento",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-500 font-sans text-gray-100`}
        >
          <main className="grid min-h-screen grid-cols-2">
            {/* Left */}
            <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
              {/* Blur */}
              <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

              {/* Stripes */}
              <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

              {userId ? (
                <UserButton
                  showName
                  appearance={{
                    elements: {
                      userButtonOuterIdentifier:
                        "text-gray-200 text-sm flex-row-reverse",
                      userButtonBox: "flex-row-reverse gap-3",
                    },
                  }}
                />
              ) : (
                <SignUpButton mode="modal">
                  <SignUp />
                </SignUpButton>
              )}
              <Hero />
              <Copyright />
            </div>

            {/* Right */}
            <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16 overflow-y-scroll max-h-screen">
              {children}
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
