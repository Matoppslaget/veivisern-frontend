import { classNames } from '@/utils/CommonFunctions';
import { Disclosure } from '@headlessui/react';
import Search from '../search/Search';
import { Product } from '@/types/ProductTypes';

interface HeaderProps {
  showSearch: boolean;
  debouncedFetchResults: (product: string) => void;
  products: Product[];
  setShowAllResults: (show: boolean) => void;
}

export default function Header({
  showSearch,
  debouncedFetchResults,
  products,
  setShowAllResults,
}: HeaderProps) {
  return (
    <Disclosure as="nav" className="sticky top-0 z-50">
      <div className="mx-auto px-6">
        <div className="relative flex h-14 items-center">
          {showSearch && (
            <div className="flex-1 flex items-center">
              <a href="/">
                <div className="text-3xl h-10 w-auto"> 🦉 MATOPPSLAGET </div>
              </a>
              <Search
                debouncedFetchResults={debouncedFetchResults}
                products={products}
                setShowAllResults={setShowAllResults}
              />
            </div>
          )}
          <div className="ml-auto">
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
