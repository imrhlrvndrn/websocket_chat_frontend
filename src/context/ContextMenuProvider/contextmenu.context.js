import { createContext, useContext, useState } from 'react';

export const ContextMenu = createContext();

export const useContextMenuManager = useContext(ContextMenu);

export const initialContextMenuState = {
    context_menus: [],
};

export const ContextMenuProvider = ({ children }) => {
    const [contextMenu, setContextMenu] = useState(
        initialContextMenuState || { context_menus: [] }
    );

    const addContextMenu = ({ targetIdentifier }) => {
        setContextMenu((prevState) => ({
            ...prevState,
            context_menus: [...prevState?.context_menus, { targetIdentifier, visibility: false }],
        }));
    };

    const removeContextMenu = ({ targetIdentifier }) => {
        setContextMenu((prevState) => ({
            ...prevState,
            context_menus: prevState?.filter((menu) => menu?.targetIdentifier !== targetIdentifier),
        }));
    };

    const updateContextMenu = (targetIdentifier, payload) => {
        setContextMenu((prevState) => ({
            ...prevState,
            context_menus: prevState?.map((menu) =>
                menu?.targetIdentifier === targetIdentifier ? payload : menu
            ),
        }));
    };

    return (
        <ContextMenu.Provider
            value={{ contextMenu, addContextMenu, removeContextMenu, updateContextMenu, context }}
        >
            {children}
        </ContextMenu.Provider>
    );
};
