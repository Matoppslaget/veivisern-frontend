'use client';

import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'; // Ensure you have the XIcon imported

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  searchFormRef: React.RefObject<HTMLFormElement | null>;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}

export default function SearchBar({
  query,
  setQuery,
  searchInputRef,
  searchFormRef,
  onInputChange,
  onFocus,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus();
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const focusInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  useEffect(() => {
    focusInput();
  }, [query]);

  return (
    <form
      className={`p-1.5 pl-2 pr-2 w-full min-w-10 bg-white rounded-xl shadow-sm flex justify-between space-x-2 border ${isFocused ? 'ring-2 ring-green-700' : ''}`}
      ref={searchFormRef}
    >
      <MagnifyingGlassIcon className="text-gray-500 w-8 h-8" />
      <input
        placeholder=""
        type="search"
        className="hide-cancel-button w-full rounded-md text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
        value={query}
        onChange={onInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={searchInputRef}
        style={{ WebkitAppearance: 'none' }}
      />
      <span className="w-6 flex justify-center">
        {query.length > 0 && (
          <XMarkIcon
            className="my-auto text-gray-500 w-6 h-6 cursor-pointer hover:text-black"
            onClick={handleClear}
          />
        )}
      </span>
    </form>
  );
}
