import { createContext, useContext, useReducer } from 'react';
import { initialAuthState, authenticationReducers } from '..';

const AuthenticationContext = createContext();

export const useAuthentication = () => useContext(AuthenticationContext);

export const AuthenticationProvider = ({ children }) => {
    return (
        <AuthenticationContext.Provider
            value={useReducer(authenticationReducers, initialAuthState)}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
