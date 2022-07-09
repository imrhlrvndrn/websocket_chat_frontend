import { useEffect, useRef, useState } from 'react';

export const useExternalEventDetector = (events = ['click'], handler = null) => {
    const [visibility, setVisibility] = useState(false);
    let elementRef = useRef(null);

    const handleExternalEvent = (event) => {
        console.log('external event detected (handleExternalEvent) => ', elementRef);
        if (elementRef.current && !elementRef.current.contains(event.target)) {
            handler();
            elementRef.current = null;
        }
    };

    useEffect(() => {
        console.log('The changed/set elementRef => ', elementRef);
        console.log('Adding DOM level listener');
        if (elementRef.current)
            events.forEach((event) => document.addEventListener(event, handleExternalEvent));

        return () => {
            console.log('Removing DOM level listener');
            if (elementRef.current)
                events.forEach((event) => document.removeEventListener(event, handleExternalEvent));
        };
    }, [elementRef?.current]);

    console.log('elementRef on console => ', elementRef);

    return { visibility, setVisibility, elementRef };
};
