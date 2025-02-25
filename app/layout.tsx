import Footer from '@/src/components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ProductsProvider } from '@/src/data-access-layer/ProductsContext';

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
        <main className="flex-grow">
          <ProductsProvider>{children}</ProductsProvider>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
