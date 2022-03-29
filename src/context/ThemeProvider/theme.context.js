import { createContext, useContext, useReducer } from 'react';
import { initialThemeState, themeReducers } from '..';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
    return (
        <ThemeContext.Provider
            value={useReducer(themeReducers, initialThemeState)}
        >
            {children}
        </ThemeContext.Provider>
    );
};
