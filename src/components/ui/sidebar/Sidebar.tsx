"use client";

import { useUIStore } from "@/store";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IoCartOutline,
  IoCloseOutline,
  IoHomeOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoMailOpenOutline,
} from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSidemenu);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    closeMenu();
    router.push("/auth/login");
  };

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Side Menu */}

      <nav
        // Todo efecto de slide
        className={clsx(
          "fixed p-5 right-0 top-0 w-[350px] h-screen bg-celeste z-20 shadow-2xl transform transition-all duration-500",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        {/* Close Menu */}
        <div className="w-full flex justify-end items-end">
          <IoCloseOutline
            size={30}
            className="cursor-pointer"
            onClick={() => closeMenu()}
          />
        </div>
        {/* Navegacion */}
        <nav>
          <ul>
            <li>
              <Link
              onClick={() => closeMenu()}
                href={"/"}
                className="flex justify-start items-center space-x-3 p-2 mt-1 hover:bg-gray-100 hover:text-black rounded-sm md:hidden"
              >
                <IoHomeOutline />
                <p>Inicio</p>
              </Link>
            </li>
            <li>
              <Link
              onClick={() => closeMenu()}
                href={"/products"}
                className="flex justify-start items-center space-x-3 p-2 mt-1 hover:bg-gray-100 hover:text-black rounded-sm md:hidden"
              >
                <IoCartOutline />
                <p>Productos</p>
              </Link>
            </li>
            <li>
              <Link
              onClick={() => closeMenu()}
                href={"/contact"}
                className="flex justify-start items-center space-x-3 p-2 mt-1 hover:bg-gray-100 hover:text-black rounded-sm md:hidden"
              >
                <IoMailOpenOutline />
                <p>Contacto</p>
              </Link>
            </li>
          </ul>
        </nav>
        {/* Separador */}
        <div className="w-full h-px bg-gray-200 my-10 md:hidden" />
        {/* Opciones del menu */}
        <Link
          onClick={() => closeMenu()}
          href="/auth/login"
          className="flex items-center p-2 hover:bg-gray-100 hover:text-black rounded transition-all"
        >
          <IoLogInOutline size={20} />
          <span className="ml-3">Ingresar</span>
        </Link>
        {/* <button
          className="flex w-full items-center mt-3 p-2 hover:bg-gray-100 hover:text-black rounded transition-all"
          onClick={() => handleSignOut()}
        >
          <IoLogOutOutline size={20} />
          <span className="ml-3">Salir</span>
        </button> */}
        {/* Separador */}
        <div className="w-full h-px bg-gray-200 my-10" />
        <Link
          onClick={() => closeMenu()}
          href="/admin"
          className="flex items-center mt-3 p-2 hover:bg-gray-100 hover:text-black rounded transition-all"
        >
          <MdAdminPanelSettings size={20} />
          <span className="ml-3">Administración</span>
        </Link>
      </nav>
    </div>
  );
};
