import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../context';

// Styled components
import StyledMainApp from './app.styledcomponent';

// React components
import { Sidebar, ChatWindow, Modal, ChatInformation, CreateGroupChat } from '../../components';

export const MainApp = ({ messages }) => {
    const navigate = useNavigate();
    const [{ user }, authDispatch] = useAuthentication();

    useEffect(() => {
        if (!user?._id) return navigate('/authenticate?tab_state=login');
    }, []);

    return (
        <StyledMainApp>
            <div className='mainApp'>
                <Sidebar />
                <ChatWindow messages={messages} />
            </div>
            {/* <Modal modal={ChatInformation} toggleModal={() => {}} /> */}
            <Modal modal={CreateGroupChat} toggleModal={() => {}} />
        </StyledMainApp>
    );
};
