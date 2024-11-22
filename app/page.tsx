import Title from '@/components/frontpage/Title';
import Search from '@/components/search/Search';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Title />
      <Search />
    </div>
  );
}
