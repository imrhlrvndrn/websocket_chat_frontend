import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getChatAvatar, getChatName } from '../../../utils';
import { useAuthentication, useChat } from '../../../context';

// React icons
import {
    AttachmentIcon,
    MoreOptionsIcon,
    SearchIcon,
    SmileIcon,
    MicIcon,
    InfoIcon,
} from '../../../react_icons';

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
import { execMessageOperation, getMessages } from '../../../http';

const dummyMessages = [
    {
        sender: { _id: '621a05cede4976eb22c1a643', full_name: 'Rahul Ravindran' },
        content:
            'Hey everyone had fun today! Thank you for the delightful day. Thank you thank you sooooo soooo much guys. I wont forget today',
    },
    {
        sender: { _id: '1', full_name: 'Rahul Ravindran' },
        content: 'Hey everyone had fun today! Thank you for the delightful day',
    },
];
let socket = io(process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4000');

export const ChatWindow = () => {
    const [{ open_chat }] = useChat();
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
            console.log(`Emitted new message`);
            setMessages((prevState) => [...prevState, data?.message]);
            setMessageInput('');
        }
    };

    const fetchChatMessages = async () => {
        try {
            // if (open_chat?.latest_message) {
            const {
                data: { success, data },
            } = await getMessages(open_chat?._id);
            if (success) {
                setMessages(() => data?.messages);
                socket.emit('join chat', open_chat?._id);
                console.log(`Joined chat ${open_chat?._id}`);
                // console.log('chat messages => ', data?.messages);
                // console.log('Socket => ', socket);
            }
            // }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setMessages([]);
        (async () => await fetchChatMessages())();
    }, [open_chat?._id]);

    useEffect(() => {
        socket.on('receive message', (new_message) => {
            console.log('Received a new message => ', { new_message, messages });
            setMessages((prevState) => [...prevState, new_message]);
        });
    }, [socket]);

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
                    <AttachmentIcon />
                    <SearchIcon />
                    <InfoIcon onClick={() => setShowChatInfo((prevState) => !prevState)} />
                    <MoreOptionsIcon />
                </>
            </ChatWindowHeader>

            <ChatWindowBody>
                {messages?.map((message) => (
                    <Messages key={message?._id} message={message} />
                    // <Text>{message}</Text>
                ))}
                {/* <div id='messagesEnd' style={{ visibility: 'hidden' }}></div> */}
            </ChatWindowBody>

            <ChatWindowMessageContainer>
                <SmileIcon />
                <ChatMessageInputForm>
                    <Input
                        value={messageInput}
                        onChange={(e) => setMessageInput(e?.target?.value)}
                        type='text'
                        name='chatbarInput'
                        id='chatbarInput'
                        placeholder='Type a message'
                    />
                    <Button
                        width='220px'
                        height='100%'
                        onClick={(e) => sendMessage(e)}
                        type='submit'
                    >
                        <Text align='center' size='heading6/large'>
                            Send a message
                        </Text>
                    </Button>
                </ChatMessageInputForm>
                <MicIcon />
            </ChatWindowMessageContainer>
            {showChatInfo && <ChatInformation setShowChatInfo={setShowChatInfo} />}
        </StyledChatWindow>
    );
};
