import React from 'react';
import Header from './Header';
// components/page_components/NavBar.tsx
import { useAppContext } from '@/components/context_components/AppContext'; // Replace with the actual path to your useSidebar hook


const Navbar = () => {
    const { isSidebarOpen, toggleSidebar } = useAppContext();

    // Function to close the sidebar
    const closeSidebar = () => {
        if (isSidebarOpen) {
            toggleSidebar();
        }
    };

    return (
        <>
            <nav className="h-24 flex justify-between px-4 py-5 bg-stone-50">
                <button onClick={toggleSidebar} type="button" className="w-24 h-auto focus:ring focus:ring-opacity-50">
                    <svg className="w-6 h-6 ">
                        <path d="M3 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1" ></path>
                    </svg>
                </button>
                <a href="/" ><Header /> </a>
                <ul className="flex items-center space-x-4">
                    <li>
                        <a href="/about" className=" hover:text-gray-400 hover:underline font-semibold text-xl">Om oss</a>
                    </li>
                </ul>
            </nav>
            {
                isSidebarOpen && (
                    <div
                        className="fixed inset-0"
                        onClick={closeSidebar}
                    ></div>
                )
            }
        </>
    );
};

export default Navbar;

