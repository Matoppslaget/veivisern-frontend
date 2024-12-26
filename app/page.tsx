import Title from '@/components/layout/Title';
import Search from '@/components/search/Search';

export default function Home() {
  const padding = typeof screen !== 'undefined' ? screen.width * 0.05 : 0;

  return (
    <div style={{ padding: `${padding}px` }}>
      <Title />
      <Search />
    </div>
  );
}
