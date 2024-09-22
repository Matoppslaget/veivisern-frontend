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
        <main className="flex-grow min-h-screen">
          <div className="hidden sm:block p-2 sm:p-4 mx-auto max-w-2xl text-center">
            <h2 className="text-sm sm:text-base font-semibold leading-7 text-lime-800">Forstå det du spiser</h2>
            <a href="/"><p className="text-2xl sm:p-2 sm:pb-4 font-bold tracking-tight text-gray-900 sm:text-4xl" >
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
