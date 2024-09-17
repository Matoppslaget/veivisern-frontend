import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react"

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
      <body className={inter.className}>
        <NavBar></NavBar>
        <div className="bg-white py-24 sm:py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-lime-800">Forstå det du spiser</h2>
              <a href="/"><p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl" >
                UP ORAKEL 🦉
              </p></a>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Med UP orakel kan du lære mer om ditt kosthold
              </p>
            </div>
          </div>
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
