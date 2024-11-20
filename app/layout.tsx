import Banner from '@/components/layout/Banner';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Matoppslaget',
  description: 'Forstå det du spiser',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow min-h-screen">
          <Banner />
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
