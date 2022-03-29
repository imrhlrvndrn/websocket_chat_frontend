import { useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useTheme } from '../context';
import { GlobalStyles } from '.';

export const lightTheme = {
    lightestBackground: 'hsl(0, 0%, 98%)', // lighest grey
    lightBackground: 'hsl(0, 0%, 96.5%)', // light grey
    mediumBackground: 'hsl(0, 0%, 92.9%)', // medium grey
    darkBackground: 'hsl(0, 0%, 86.9%)', // dark grey
    text: 'hsl(0, 0%, 1.6%)', // dark blue
    icon: 'hsl(0, 0%, 56.9%)',
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
    const [{ isDarkTheme }, themeDispatch] = useTheme();

    const theme = {
        breakpoints: {
            lg_tablet: 'screen and (max-width: 1024px)',
            tablet: 'screen and (max-width: 770px)',
            mobile: 'screen and (max-width: 510px)',
            sm_mobile: 'screen and (max-width: 350px)',
        },
        colors: {
            ...(isDarkTheme ? darkTheme : lightTheme),
            constants: {
                darkText: 'hsl(0, 0%, 1.6%)',
                lightText: 'hsl(0, 0%, 93.3%)',
                // colorBackground: '#CAF4FF',
                primary: {
                    light: 'hsl(221, 100%, 68%)',
                    medium: 'hsl(221, 100%, 58%)',
                    dark: 'hsl(221, 100%, 48%)',
                },

                purple: '91, 87, 115',
                yellow: '252,192,0',
                danger: '255,14,87',
                success: '0,162,184',
            },
        },
        fonts: {
            weight: {
                light: 400,
                medium: 600,
                bold: 700,
            },
            size: {
                display1: { large: '3.75rem' },
                display2: { large: '3rem' },
                heading1: { large: '3rem', small: '2.125rem' },
                heading2: { large: '2.125rem', small: '1.5rem' },
                heading3: { large: '1.5rem', small: '1.25rem' },
                heading4: { large: '1.25rem', small: '1rem' },
                heading5: { large: '1rem', small: '0.875rem' },
                heading6: { large: '0.875rem', small: '0.75rem' },
                body: { large: '1rem', small: '0.875rem' },
                caption: { large: '0.75rem', small: '0.6875rem' },
            },
        },
        spacing: {
            xs: '0.5rem',
            sm: '0.8rem',
            md: '1rem',
            lg: '1.2rem',
            xl: '1.7rem',
            '2xl': '2rem',
            '4xl': '4rem',
            '6xl': '6rem',
        },
    };

    useEffect(() => {
        themeDispatch({ type: 'SET_THEME' });
    }, []);

    return (
        <StyledThemeProvider theme={theme}>
            <GlobalStyles />
            {children}
        </StyledThemeProvider>
    );
};
