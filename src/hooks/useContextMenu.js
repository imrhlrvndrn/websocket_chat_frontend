import { useCallback, useEffect, useState, forwardRef } from 'react';

export const useContextMenu_original = () => {
    const [xPos, setXPos] = useState('0px');
    const [yPos, setYPos] = useState('0px');
    const [showMenu, setShowMenu] = useState(false);

    const handleContextMenu = useCallback(
        (e) => {
            e.preventDefault();

            setXPos(`${e.pageX}px`);
            setYPos(`${e.pageY}px`);
            setShowMenu(true);
        },
        [setXPos, setYPos]
    );

    const handleClick = useCallback(() => {
        showMenu && setShowMenu(false);
    }, [showMenu]);

    useEffect(() => {
        document
            .querySelectorAll('.messageContainer')
            .forEach((element) => element.addEventListener('click', handleClick));
        document
            .querySelectorAll('.messageContainer')
            .forEach((element) => element.addEventListener('contextmenu', handleContextMenu));

        return () => {
            document
                .querySelectorAll('.messageContainer')
                .forEach((element) => element.removeEventListener('click', handleClick));
            document
                .querySelectorAll('.messageContainer')
                .forEach((element) =>
                    element.removeEventListener('contextmenu', handleContextMenu)
                );
        };
    });

    return { xPos, yPos, showMenu };
};

export const useContextMenu = (identifier) => {
    const [xPos, setXPos] = useState('0px');
    const [yPos, setYPos] = useState('0px');
    const [showMenu, setShowMenu] = useState(false);

    const handleContextMenu = useCallback(
        (e) => {
            e.preventDefault();

            setXPos(`${e.pageX}px`);
            setYPos(`${e.pageY}px`);
            setShowMenu(true);
        },
        [setXPos, setYPos]
    );

    useEffect(() => {
        const contextmenuinstance = document.querySelector(`.${identifier}`);
        contextmenuinstance.addEventListener('contextmenu', handleContextMenu);

        console.log('Context Menu Instance => ', contextmenuinstance);
        console.log('LOaded contextmenu eventlisteners');

        return () => contextmenuinstance.removeEventListener('contextmenu', handleContextMenu);
    }, []);

    return {
        xPos,
        yPos,
        showMenu,
    };
};
