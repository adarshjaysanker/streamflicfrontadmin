import React, {createContext, useContext, useState} from "react";


const Sidebarcontext = createContext();

export const useSidebar = () => useContext(Sidebarcontext);

export const SidebarProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(prevState => !prevState)

    return(
        <Sidebarcontext.Provider value={{isOpen, toggleSidebar}}>
            {children}
        </Sidebarcontext.Provider>
    )
}