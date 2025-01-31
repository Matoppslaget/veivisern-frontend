'use client';

import Title from '@/components/layout/Title';
import Search from '@/components/search/Search';
import Header from '@/components/layout/Header';

export default function Home() {
  //const padding = typeof screen !== 'undefined' ? screen.width * 0.05 : 0;

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
