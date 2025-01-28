import { classNames } from '@/utils/CommonFunctions';
import { Disclosure } from '@headlessui/react';
import Search from '../search/Search';
import { Product } from '@/types/ProductTypes';
import Link from 'next/link';

interface HeaderProps {
  showLogo: boolean;
  showSearch: boolean;
  debouncedFetchResults: (product: string) => void;
  products: Product[];
  setShowAllResults: (show: boolean) => void;
  // resetToWelcome: () => void;
}

export default function Header({
  showSearch,
  showLogo,
  debouncedFetchResults,
  products,
  setShowAllResults,
  // resetToWelcome,
}: HeaderProps) {
  return (
    <Disclosure as="nav">
      <div className="mx-auto px-6">
        <div className="relative flex h-14 items-center">
          {showLogo && (
            <div className="flex-1 flex items-center">
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  // resetToWelcome();
                }}
              >
                <div className="text-center font-bold text-gray-900 text-3xl h-10 w-auto">
                  <span className="hidden md:inline">🦉 MATOPPSLAGET</span>
                  <span className="md:hidden">🦉</span>
                </div>
              </Link>
            </div>
          )}
          {showSearch && (
            <div className="flex-1 flex items-center">
              <Search
                debouncedFetchResults={debouncedFetchResults}
                products={products}
                setShowAllResults={setShowAllResults}
              />
            </div>
          )}
          <div className="flex-1 flex items-end justify-end">
            <a
              key={'about-us'}
              href={'/about'}
              className={classNames(
                'text-gray-black hover:bg-lime-700 hover:text-white',
                'rounded-md px-2 py-2.5 flex text-sm font-medium items-center',
              )}
            >
              Om oss
            </a>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
