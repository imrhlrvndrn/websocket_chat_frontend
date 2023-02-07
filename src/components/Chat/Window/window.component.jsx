import io from 'socket.io-client';
import { useChatRequests } from '../../../hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthentication, useChat } from '../../../context';
import { execMessageOperation, getMessages } from '../../../http';
import { getChatAvatar, getChatName, isUserBlocked } from '../../../utils';

// React icons
import { InfoIcon } from '../../../react_icons';

// Styled components
import { Container, Text } from '../../../styled_components';
import {
    ChatMessageInputForm,
    ChatWindowBody,
    ChatWindowHeader,
    ChatWindowMessageContainer,
    StyledChatWindow,
} from './window.styledcomponent';

// React components
import { Avatar, Button, Input, Messages, ChatInformation } from '../..';

let socket = io(process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4000');

export const ChatWindow = () => {
    const chatsRef = useRef(null);
    const [isBlocked, setIsBlocked] = useState({ value: false, user: '' });
    const [{ open_chat, user_chats }, chatDispatch] = useChat();
    const { blockUser } = useChatRequests();
    const [{ user }] = useAuthentication();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [showChatInfo, setShowChatInfo] = useState(false);
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    const sendMessage = async (event) => {
        event.preventDefault();

        if (messageInput === '') return;

        const {
            data: { success, data },
        } = await execMessageOperation({
            chat_id: open_chat?._id,
            action: 'new',
            data: { content: messageInput },
        });
        if (success) {
            socket.emit('new message', data?.message);
            setMessages((prevState) => [...prevState, data?.message]);
            setMessageInput('');
            chatsRef.current?.scrollIntoView({ behavior: 'smooth' });
            chatDispatch({
                type: 'SORT_CHATS',
                payload: user_chats?.map((chat) =>
                    chat?._id === open_chat?._id
                        ? {
                              ...chat,
                              updatedAt: new Date().toISOString(),
                              latest_message: data?.message,
                          }
                        : chat
                ),
            });
        }
    };

    const fetchChatMessages = async () => {
        try {
            const {
                data: { success, data },
            } = await getMessages(open_chat?._id);
            if (success) {
                setMessages(() => data?.messages);
                socket.emit('join chat', open_chat?._id);
                console.log(`Joined chat ${open_chat?._id}`);
                chatsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setMessages([]);
        (async () => await fetchChatMessages())();
    }, [open_chat?._id]);

    // Check once, if the user is blocked by the logged user
    useEffect(() => {
        if (open_chat?.is_group_chat) return;

        const is_blocked = isUserBlocked({ users: open_chat?.users, logged_user: user });
        setIsBlocked(() => is_blocked);
    }, [open_chat?._id, user?.blocked]);

    useEffect(() => {
        socket.on('receive message', (new_message) => {
            setMessages((prevState) => [...prevState, new_message]);
            chatDispatch({
                type: 'SORT_CHATS',
                payload: user_chats?.map((chat) =>
                    chat?._id === open_chat?._id
                        ? {
                              ...chat,
                              updatedAt: new Date().toISOString(),
                              latest_message: new_message,
                          }
                        : chat
                ),
            });
        });
    }, [socket]);

    console.log('isBlocked => ', isBlocked);

    return (
        <StyledChatWindow>
            <ChatWindowHeader>
                <Avatar
                    margin='0 1rem 0 0'
                    size='50px'
                    altText={open_chat?.name}
                    url={getChatAvatar({
                        logged_user: user,
                        chat: open_chat,
                    })}
                />
                <Container style={{ flex: 1 }}>
                    <Text as='h2' weight='medium'>
                        {getChatName({ logged_user: user, chat: open_chat })}
                        {isSocketConnected && ' Initialized'}
                    </Text>
                    <Text size='caption/large'>Last seen at ...</Text>
                </Container>
                <>
                    <InfoIcon onClick={() => setShowChatInfo((prevState) => !prevState)} />
                </>
            </ChatWindowHeader>

            <ChatWindowBody>
                {messages?.map((message) => (
                    <Messages key={message?._id} message={message} />
                ))}
                <div id='messagesEnd' ref={chatsRef}></div>
            </ChatWindowBody>

            <ChatWindowMessageContainer>
                <ChatMessageInputForm>
                    <Input
                        style={{ cursor: isBlocked?.value ? 'not-allowed' : 'text' }}
                        autoFocus
                        value={messageInput}
                        onChange={(e) => setMessageInput(e?.target?.value)}
                        type='text'
                        name='chatbarInput'
                        id='chatbarInput'
                        placeholder={
                            isBlocked?.value
                                ? `You can no longer send messages in this chat`
                                : 'Type a message'
                        }
                        disabled={isBlocked?.value}
                    />
                    <Button
                        width='220px'
                        height='100%'
                        onClick={(e) => {
                            e?.preventDefault();
                            if (isBlocked?.value && isBlocked?.user === 'logged_user')
                                // ! Make the app responsive & consolidate all the Chat Requests in
                                // ! the same useChatRequests hook
                                blockUser(
                                    open_chat?.users?.filter(
                                        (chatUser) => chatUser?._id !== user?._id
                                    )?.[0]?._id,
                                    isBlocked
                                );
                            else sendMessage(e);
                        }}
                        type='submit'
                        disabled={isBlocked?.value && isBlocked?.user === 'other_user'}
                    >
                        <Text align='center' size='heading6/large'>
                            {isBlocked?.value && isBlocked?.user === 'logged_user'
                                ? 'Unblock'
                                : 'Send a message'}
                        </Text>
                    </Button>
                </ChatMessageInputForm>
            </ChatWindowMessageContainer>
            {showChatInfo && <ChatInformation setShowChatInfo={setShowChatInfo} />}
        </StyledChatWindow>
    );
};
