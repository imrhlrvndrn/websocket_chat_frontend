import { useCallback, useEffect, useState } from 'react';
import { useExternalEventDetector } from './';

export const useContextMenu = (identifier, setVisibility) => {
    const [xPos, setXPos] = useState('0px');
    const [yPos, setYPos] = useState('0px');

    const handleContextMenu = useCallback(
        (e) => {
            e.preventDefault();

            console.log('Setting new pointer position...');
            setXPos(`${e.pageX}px`);
            setYPos(`${e.pageY}px`);
            setVisibility(true);
        },
        [setXPos, setYPos, setVisibility]
    );

    const handleClickWithin = useCallback(
        (event) => {
            event.preventDefault();

            console.log('Hiding the contextmenu because of the internal click event...');
            setVisibility(false);
        },
        [setVisibility]
    );

    useEffect(() => {
        const contextmenuinstance = document.querySelector(`${identifier}`);
        console.log('contextMenu Instance => ', contextmenuinstance);
        console.log('Adding contextmenu listener...');
        contextmenuinstance.addEventListener('contextmenu', handleContextMenu);
        console.log('Adding click listener...');
        contextmenuinstance.addEventListener('click', handleClickWithin);

        return () => {
            console.log('Removing contextmenu listener...');
            contextmenuinstance.removeEventListener('contextmenu', handleContextMenu);
            console.log('Removing click listener...');
            contextmenuinstance.removeEventListener('click', handleClickWithin);
        };
    }, []);

    return { xPos, yPos };
};
