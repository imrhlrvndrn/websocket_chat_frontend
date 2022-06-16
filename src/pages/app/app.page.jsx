import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthentication, useChat } from '../../context';

// Styled components
import StyledMainApp from './app.styledcomponent';

// React components
import { Sidebar, ChatWindow, Modal, ChatInformation, CreateGroupChat } from '../../components';
import { fetchChat } from '../../http';

export const MainApp = ({ messages }) => {
    const navigate = useNavigate();
    const params = useParams();
    const [_, chatDispatch] = useChat();
    const [{ user }] = useAuthentication();

    useEffect(() => {
        if (!user?._id) return navigate('/authenticate?tab_state=login');
    }, []);

    const fetchChatInfo = async () => {
        try {
            const {
                data: { data, success },
            } = await fetchChat(params?.chatId);
            console.log('Chat information (MainApp)=> ', { data });
            if (success) chatDispatch({ type: 'SET_OPEN_CHAT', payload: data?.chat });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!!params?.chatId) (async () => await fetchChatInfo())();
    }, [params?.chatId]);

    return (
        <StyledMainApp>
            <div className='mainApp'>
                <Sidebar />
                <ChatWindow messages={messages} />
            </div>
        </StyledMainApp>
    );
};
