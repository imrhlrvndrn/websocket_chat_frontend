import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './styled_components';
import { BrowserRouter as Router } from 'react-router-dom';
import {
    AuthenticationProvider,
    ChatProvider,
    CustomThemeProvider,
    ModalProvider,
} from './context';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <CustomThemeProvider>
                <ThemeProvider>
                    <AuthenticationProvider>
                        <ChatProvider>
                            <ModalProvider>
                                <App />
                            </ModalProvider>
                        </ChatProvider>
                    </AuthenticationProvider>
                </ThemeProvider>
            </CustomThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
