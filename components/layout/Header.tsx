import { classNames } from '@/utils/CommonFunctions';
import { Disclosure } from '@headlessui/react';

interface HeaderProps {
  showLogo?: boolean;
  Search?: JSX.Element;
}

export default function Header({ showLogo = true, Search }: HeaderProps) {
  return (
    <Disclosure as="nav">
      <div className="mx-auto px-6">
        <div className="relative flex h-14 items-center">
          {showLogo && (
            <div className="flex-1 flex items-center">
              <a href="/">
                <div className="text-center text-gray-900 text-3xl h-10 w-auto">
                  <span className="hidden md:inline">🦉 MATOPPSLAGET</span>
                  <span className="md:hidden">🦉</span>
                </div>
              </a>
            </div>
          )}
          {Search && Search}
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
