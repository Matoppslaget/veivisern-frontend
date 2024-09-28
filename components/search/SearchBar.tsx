import React, { use, useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"; // Ensure you have the XIcon imported

interface SearchBarProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    searchInputRef: React.RefObject<HTMLInputElement>;
    searchDivRef: React.RefObject<HTMLDivElement>;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, searchInputRef, searchDivRef, onInputChange, onFocus }) => {
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
        <div
            className={`p-1.5 pl-2 pr-4 bg-white rounded-xl shadow-sm flex justify-between space-x-2 border ${isFocused ? 'ring-2 ring-green-700' : ''}`}
            ref={searchDivRef}
        >
            <MagnifyingGlassIcon className="text-gray-500 w-8 h-8" />
            <input
                placeholder="Søk"
                type="search"
                className="hide-cancel-button w-full rounded-md pr-20 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                value={query}
                onChange={onInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={searchInputRef}
                style={{ WebkitAppearance: 'none' }}
            />
            {query.length > 0 && (
                <XMarkIcon
                    className="my-auto text-gray-500 w-6 h-6 cursor-pointer hover:text-black"
                    onClick={handleClear}
                />
            )}
        </div>
    );
};

export default SearchBar;