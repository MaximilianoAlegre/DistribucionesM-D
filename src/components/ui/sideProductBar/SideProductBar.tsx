import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const SideProductBar = () => {
  return (
    <div className="min-h-screen">
      {/* Titulo */}
      <div>
        <h1
          className={`${titleFont.className} text-xl font-bold p-2 text-center`}
        >
          Categorias
        </h1>
      </div>
      {/* Divisor */}
      <div className="w-[90%] mx-auto h-0.5 rounded bg-gray-200 mb-10" />
      {/* Enlaces */}
      <div className="">
        <Link href="/category/men">
          <p className="w-full m-2 p-1 transition-all hover:bg-gray-100">
            Hombres
          </p>
        </Link>
        <Link href="/category/women">
          <p className="w-full m-2 p-1 transition-all hover:bg-gray-100">
            Mujeres
          </p>
        </Link>
        <Link href="/category/kid">
          <p className="w-full m-2 p-1 transition-all hover:bg-gray-100">
            Niños
          </p>
        </Link>
      </div>
    </div>
  );
};
