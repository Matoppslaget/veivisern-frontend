import { ReactNode, createContext, useContext, useState } from 'react';

const AppContext = createContext<{ isSidebarOpen: boolean; toggleSidebar: () => void }>({ isSidebarOpen: false, toggleSidebar: () => { } });

export const useAppContext = () => useContext(AppContext);

interface ContextProps {
    children: ReactNode;
}

export const AppContextProvider = ({ children }: ContextProps) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <AppContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            {children}
        </AppContext.Provider>
    );
};