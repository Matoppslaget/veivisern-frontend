import React, { useRef } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
    query: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onInputChange, onFocus }) => {
    const searchInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="p-1.5 pl-2 pr-4 bg-white rounded-xl shadow-sm flex justify-between space-x-2 border">
            <input
                placeholder="Søk etter produkt..."
                type="text"
                className="w-full rounded-md pl-4 pr-20 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-1 focus:ring-green-700 focus:ring-opacity-30 focus:outline-none sm:text-sm sm:leading-6"
                value={query}
                onChange={onInputChange}
                onFocus={onFocus}
                ref={searchInputRef}
            />
            <MagnifyingGlassIcon className="text-gray-500 w-10 h-10 justify-end hover:cursor-pointer hover:text-black" />
        </div>
    );
};

export default SearchBar;