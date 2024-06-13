"use client";
import { useCarrito } from "@/contexts/CarritoContext";
import { useUIStore } from "@/store";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const TopMenu = () => {
  const openSidemenu = useUIStore((state) => state.openSideMenu);
  const { countProducts } = useCarrito();

  return (
    <div className="flex justify-between items-center w-full bg-negro fixed top-0 left-0 z-10">
      <nav className="w-[90%] mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/" className="flex flex-col justify-center items-center">
            <div>
              <img
                src="/imgs/logoTranslucedcopy.png"
                alt="Logo"
                className="w-[100px] object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Center Menu */}

        <div className={`${roboto.className} bodiy hidden md:block`}>
          <ul className="ulNav">
            <li className="liNav">
              <Link className="linkNav" href={"/"}>
                INICIO
              </Link>
            </li>
            <li className="liNav">
              <Link className="linkNav" href={"/products"}>
                PRODUCTOS
              </Link>
            </li>
            <li className="liNav">
              <Link className="linkNav" href={"/contact"}>
                CONTACTO
              </Link>
            </li>
          </ul>
        </div>

        {/* Search, Cart, Menu */}
        <div className="flex items-center">
          <Link
            href="/products"
            className="mx-2 p-2 transition-all text-text2 "
          >
            <IoSearchOutline size={20} />
          </Link>
          {/* <Carrito/> */}
          <Link href={"/Cart"} className="relative">
            <div className="flex justify-center items-center text-text2">
              <IoCartOutline size={20} />
              {countProducts > 0 && (
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-celeste text-white flex justify-center items-center">
                  <span className="text-xs">{countProducts}</span>
                </div>
              )}
            </div>
          </Link>

          <button
            onClick={openSidemenu}
            className="m-2 p-2 transition-all text-text2"
          >
            <FaBars size={20} />
          </button>
        </div>
      </nav>
    </div>
  );
};
