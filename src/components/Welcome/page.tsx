"use client";

import { useSession } from "next-auth/react";

export function Welcome() {
  const { data: session, status, update } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      <div className="text-center w-fit">
        <h1 className="font-bold text-text1 p-2 my-2">
          Bievenido <span className="text-celeste">{session?.user?.name}</span>
        </h1>
        <p className="text-text2 font-thin p-2 my-2">
          Correo: <span className="text-celeste">{session?.user?.email}</span>
        </p>
      </div>
    </div>
  );
}
