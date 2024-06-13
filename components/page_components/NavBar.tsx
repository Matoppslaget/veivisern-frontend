import React from 'react';
import Header from './Header';

const Navbar = () => {
    return (
        <nav className="h-24 flex justify-between px-4 py-5 bg-stone-50">
            <button type="button" className="w-24 h-auto focus:ring-white hover:opacity-50 active:opacity-50">
                <svg className="w-6 h-6 ">
                    <path d="M3 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1" ></path>
                </svg>
            </button>
            <a href="/" ><Header /> </a>

            <ul className="flex items-center space-x-4">
                <li>
                    <a href="/about" className=" hover:text-gray-400 font-semibold text-xl">Om oss</a>
                </li>
            </ul>
        </nav >
    );
};

export default Navbar;


