import React, { useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useTheme } from '../context';
import { GlobalStyles } from '.';

export const lightTheme = {
    lightestBackground: 'hsl(0, 0%, 98%)', // lighest grey
    lightBackground: 'hsl(0, 0%, 96.5%)', // light grey
    mediumBackground: 'hsl(0, 0%, 92.9%)', // medium grey
    darkBackground: 'hsl(0, 0%, 86.9%)', // dark grey
    text: 'hsl(0, 0%, 1.6%)', // dark blue
    icon: 'hsl(0, 0%, 1.6%)',
};

export const darkTheme = {
    lightestBackground: 'hsl(0, 0%, 30%)', // lightest blue
    lightBackground: 'hsl(0, 0%, 20%)', // light blue
    mediumBackground: 'hsl(0, 0%, 12%)',
    darkBackground: 'hsl(0, 0%, 7%)', //dark blue
    text: 'hsl(0, 0%, 93.3%)', // light grey
    icon: 'hsl(0, 0%, 93.3%)',
};

export const ThemeProvider = ({ children }) => {
    const [{ isDarkTheme, theme }, themeDispatch] = useTheme();

    useEffect(() => {
        themeDispatch({ type: 'SET_THEME' });
    }, []);

    return (
        <StyledThemeProvider
            theme={{
                ...theme,
                colors: { ...theme?.colors, ...(isDarkTheme ? darkTheme : lightTheme) },
            }}
        >
            <GlobalStyles />
            {children}
        </StyledThemeProvider>
    );
};
