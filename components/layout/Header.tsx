import { classNames } from '@/utils/CommonFunctions';
import { Disclosure } from '@headlessui/react';

export default function Header() {
  return (
    <Disclosure as="nav" className="sticky top-0 z-50">
      <div className="mx-auto px-6">
        <div className="relative flex h-14 items-center justify-between">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <a href="/">
                {' '}
                <div className="text-3xl h-10 w-auto"> 🦉 </div>
              </a>
            </div>
          </div>
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
    </Disclosure>
  );
}
