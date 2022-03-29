import { useCallback, useEffect, useState } from 'react';

const useContextMenu = () => {
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
                .forEach((element) => element.addEventListener('click', handleClick));
            document
                .querySelectorAll('.messageContainer')
                .forEach((element) =>
                    element.removeEventListener('contextmenu', handleContextMenu)
                );
        };
    });

    return { xPos, yPos, showMenu };
};

export default useContextMenu;
