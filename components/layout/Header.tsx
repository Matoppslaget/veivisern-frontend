import { classNames } from '@/utils/CommonFunctions';
import { Disclosure } from '@headlessui/react';
import { usePathname } from 'next/navigation';
import Search from '../search/Search';
import Title from './Title';

interface HeaderProps {
  showLogo?: boolean;
}

export default function Header({ showLogo = true }: HeaderProps) {
  const isSearchPage = usePathname() === '/search';

  return (
    <Disclosure as="nav">
      <div className="mx-auto px-3 sm:px-6">
        {/* Grid layout for desktop and mobile */}
        <div className="relative h-14 items-center grid grid-cols-6 sm:grid-cols-4">
          {showLogo && (
            <div className="flex-1 flex items-center">
              <a href="/">
                <Title
                  style="text-center text-gray-900 text-3xl h-10 w-auto"
                  isLogo={true}
                />
              </a>
            </div>
          )}

          {/* Search for desktop */}
          {isSearchPage && (
            <div className="hidden sm:block sm:col-span-2 col-start-2">
              <Search />
            </div>
          )}

          <div className="flex-1 flex items-end justify-end col-start-6 sm:col-start-4">
            <a
              key={'about-us'}
              href={'/about'}
              className={classNames(
                'text-gray-black hover:bg-lime-700 hover:text-white',
                'rounded-md px-1 py-2 flex text-sm font-medium items-center',
              )}
            >
              Om oss
            </a>
          </div>
        </div>

        {/* Search for mobile */}
        {isSearchPage && (
          <div className="block sm:hidden">
            <Search />
          </div>
        )}
      </div>
    </Disclosure>
  );
}
