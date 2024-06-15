import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { CarritoProvider } from "@/contexts/CarritoContext";
import { Footer, Sidebar, TopMenu } from "@/components";
import Provider from "@/contexts/Provider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Distribuciones | M&D",
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <CarritoProvider>
          <TopMenu />
          <Sidebar />
          <Provider>
            <div className="mt-40 w-[90%] mx-auto min-h-screen">{children}</div>
          </Provider>
          <Footer />
        </CarritoProvider>
      </body>
    </html>
  );
}
