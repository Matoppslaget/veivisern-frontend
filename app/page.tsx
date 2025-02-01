'use client';

import Title from '@/components/layout/Title';
import Search from '@/components/search/Search';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <div>
      <Header showLogo={false} />
      <main>
        <Title />
        <Search />
      </main>
    </div>
  );
}
