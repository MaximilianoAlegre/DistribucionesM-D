"use client";

import { NewProducts, Welcome } from "@/components";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <main>
        <Welcome />
        <NewProducts />
      </main>
    </SessionProvider>
  );
}
