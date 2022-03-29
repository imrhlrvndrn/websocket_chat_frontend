import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './styledcomponents';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationProvider, ChatProvider, CustomThemeProvider } from './context';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <CustomThemeProvider>
                <ThemeProvider>
                    <AuthenticationProvider>
                        <ChatProvider>
                            <App />
                        </ChatProvider>
                    </AuthenticationProvider>
                </ThemeProvider>
            </CustomThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
