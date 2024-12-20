import { Disclosure } from '@headlessui/react';

const navigation = [
  { name: 'Søk etter produkter', href: '/search', current: false },
  { name: 'Om oss', href: '/about', current: false },
  // { name: 'Team', href: '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-lime-800">
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between">
          {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-lime-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div> */}
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <a href="/">
                {' '}
                <div className="text-3xl h-10 w-auto"> 🦉 </div>
              </a>
            </div>
            <div className="ml-4 sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  key={navigation.at(0)!.name}
                  href={navigation.at(0)!.href}
                  aria-current={navigation.at(0)!.current ? 'page' : undefined}
                  className={classNames(
                    navigation.at(0)!.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-lime-700 hover:text-white',
                    'rounded-md px-2 py-2.5 text-sm font-medium',
                  )}
                >
                  {navigation.at(0)!.name}
                </a>
              </div>
            </div>
          </div>
          <a
            key={navigation.at(1)!.name}
            href={navigation.at(1)!.href}
            aria-current={navigation.at(1)!.current ? 'page' : undefined}
            className={classNames(
              navigation.at(1)!.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-lime-700 hover:text-white',
              'rounded-md px-2 py-2.5 flex text-sm font-medium items-center',
            )}
          >
            {navigation.at(1)!.name}
          </a>
          {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full px-2 py-1 text-sm focus:outline-none focus:ring-2 text-gray-300 hover:bg-lime-700 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <UserCircleIcon className="h-7 w-7  rounded-full "></UserCircleIcon>
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Your Profile
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Settings
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Sign out
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div> */}
        </div>
      </div>
      {/* 
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel> */}
    </Disclosure>
  );
}
