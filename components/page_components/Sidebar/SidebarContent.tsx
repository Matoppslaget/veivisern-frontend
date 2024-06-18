interface SidebarContentProps {
    // Define your prop types here if needed
}

const SidebarContent: React.FC<SidebarContentProps> = () => {
    return (
        <aside className="w-64" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span className="ml-3">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span className="ml-3">About</span>
                        </a>
                    </li>
                    {/* Add more sidebar items here */}
                </ul>
            </div>
        </aside>
    );
};

export default SidebarContent;