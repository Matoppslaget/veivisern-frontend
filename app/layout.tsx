import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react"
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UP Orakel",
  description: "Forstå hva du spiser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NavBar></NavBar>
        <main className="flex-grow">
          <div className="p-4 mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-lime-800">Forstå det du spiser</h2>
            <a href="/"><p className=" text-3xl p-2 pb-4 font-bold tracking-tight text-gray-900 sm:text-4xl" >
              UP ORAKEL 🦉
            </p></a>
          </div>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
