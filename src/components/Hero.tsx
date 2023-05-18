import Image from "next/image";
import praSempreLogo from "@/assets/pra-sempre-logo.svg";

export function Hero() {
  return (
    <div className="space-y-5">
      <Image src={praSempreLogo} alt="NLW Spacetime" />
      <div className="max-w-[420px] space-y-1">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Seu registro de momentos 💕
        </h1>
        <p className="text-lg leading-relaxed">
          Preserve e compartilhe (se quiser) momentos especiais do seu
          relacionamento!
        </p>
      </div>
      <a
        className="inline-block rounded-full bg-pink-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-pink-400"
        href=""
      >
        CADASTRAR LEMBRANÇA
      </a>
    </div>
  );
}
