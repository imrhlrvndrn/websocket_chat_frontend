import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDataLayerValue } from '../DataLayer';
import { db } from '../firebase';

// Styled components
import StyledMainApp from './StyledMainApp';

// React components
import Sidebar from '../components/Sidebar/Sidebar';
import MainChat from '../components/MainChat/MainChat';
import Login from './Login/Login';
import ChatInfo from '../components/ChatInfo/ChatInfo';

const MainApp = ({ messages }) => {
    const [{ user, chatInfo }, dispatch] = useDataLayerValue();

    return (
        <StyledMainApp>
            {user ? (
                <div className='mainApp'>
                    <Router>
                        <Sidebar />
                        <Route exact path='/chats/:chatId' component={MainChat} />
                        {chatInfo && <ChatInfo />}
                    </Router>
                </div>
            ) : (
                <Login />
            )}
        </StyledMainApp>
    );
};

export default MainApp;
