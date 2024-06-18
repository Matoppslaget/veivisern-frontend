import { useAppContext } from "@/components/context_components/AppContext";

const Sidebar = () => {
    const { isSidebarOpen, toggleSidebar } = useAppContext();
    return (
        <div
            className={`fixed top-0 left-0 z-20 h-full bg-gray-300 p-4 transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            Sidebar
        </div>
    );
};

export default Sidebar;