'use client';

import Title from '@/components/layout/Title';
import Search from '@/components/search/Search';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <div>
      <Header showLogo={false} />
      <main>
        <Title style="mt-6 sm:mt-0" />
        <Search />
      </main>
    </div>
  );
}
