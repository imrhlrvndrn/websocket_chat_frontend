import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthentication, useChat } from '../../context';

// Styled components
import StyledMainApp from './app.styledcomponent';

// React components
import { Sidebar, ChatWindow } from '../../components';

export const MainApp = ({ messages }) => {
    const navigate = useNavigate();
    const params = useParams();
    const [{ user_chats, open_chat }, chatDispatch] = useChat();
    const [{ user }] = useAuthentication();

    useEffect(() => {
        if (!user?._id) return navigate('/authenticate?tab_state=login');
    }, []);

    const fetchChatInfo = async () => {
        if (user_chats?.length !== 0)
            try {
                let chat;
                if (!params?.chatId) {
                    chat = user_chats?.[0];
                    navigate(`/${chat?._id}`, { replace: true });
                } else {
                    console.log('in the else statement');
                    let matched_chat = user_chats?.filter((chat) => chat?._id === params?.chatId);
                    if (!matched_chat?.length > 0) {
                        chat = user_chats[0];
                        navigate(`/${chat?._id}`, { replace: true });
                    } else chat = matched_chat[0];
                    console.log('After calculation => ', chat);
                }

                chatDispatch({ type: 'SET_OPEN_CHAT', payload: chat });
            } catch (error) {
                console.error(error);
            }
    };

    useEffect(() => {
        (async () => await fetchChatInfo())();
    }, [params?.chatId, open_chat?._id]);

    useEffect(() => {
        if (!user?._id) navigate('/authenticate', { replace: true });
        else navigate('/', { replace: true });

        return () => chatDispatch({ type: 'SET_USER_CHATS', payload: [] });
    }, []);

    console.log('openchat => ', open_chat);

    return (
        <StyledMainApp>
            <div className='mainApp'>
                <Sidebar />
                {params?.chatId && <ChatWindow messages={messages} />}
            </div>
        </StyledMainApp>
    );
};
