'use client'
import { signOut } from "next-auth/react";
import Link from "next/link";
import { BiSolidCategory } from "react-icons/bi";
import { FaShop } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";

export default function () {
  return (
    <div className="flex flex-wrap justify-center items-center w-full gap-5">
      <Link
        href={"/new"}
        className="bg-gris hover:bg-gris1 transition-all duration-300 w-[300px] h-[300px] flex flex-col justify-center items-center"
      >
        <div className="flex justify-center items-center">
          <FaShop size={150} />
        </div>
        <div className="flex justify-center items-center">
          <h2>ADMINISTRAR PRODUCTOS</h2>
        </div>
      </Link>
      <Link
        href={"/newcategory"}
        className="bg-gris hover:bg-gris1 transition-all duration-300 w-[300px] h-[300px] flex flex-col justify-center items-center"
      >
        <div className="flex justify-center items-center">
          <BiSolidCategory size={150} />
        </div>
        <div className="flex justify-center items-center">
          <h2>ADMINISTRAR CATEGORÍAS</h2>
        </div>
      </Link>
      <button
        onClick={() => signOut()}
        className="bg-gris hover:bg-gris1 transition-all duration-300 w-[300px] h-[300px] flex flex-col justify-center items-center"
      >
        <div className="flex justify-center items-center">
          <IoLogOutOutline size={150} />
        </div>
        <div className="flex justify-center items-center">
          <h2>CERRAR ADMINISTRACÓN</h2>
        </div>
      </button>
    </div>
  );
}
