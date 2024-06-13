import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex justify-center text-xs mb-10">
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold`}>
          Distribuciones
        </span>
        <span> | M&D </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>

      <Link href="/" className="mx-2">
        Privacidad & Legal
      </Link>

      <Link href="/" className="mx-2">
        Ubicaciones
      </Link>
    </div>
  );
};
