"use client";

import { NewProducts, Welcome } from "@/components";
import { SessionProvider, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()
  return (
    <SessionProvider>
      <main>
        <Welcome />
        <NewProducts />
      </main>
    </SessionProvider>
  );
}
