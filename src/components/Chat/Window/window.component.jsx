import React, { useState } from 'react';
import { axios } from '../../../config';

// React icons
import {
    AttachmentIcon,
    MoreOptionsIcon,
    SearchIcon,
    SmileIcon,
    MicIcon,
} from '../../../react_icons';

// Styled components
import {
    ChatMessageInputForm,
    ChatWindowBody,
    ChatWindowHeader,
    ChatWindowMessageContainer,
    StyledChatWindow,
} from './window.styledcomponent';

// React components
import { Avatar, Button, Input, Messages } from '../..';
import { Container, Text } from '../../../styledcomponents';

export const ChatWindow = ({ messages }) => {
    const [input, setInput] = useState('');

    const sendMessage = (event) => {
        event.preventDefault();

        if (input === '') return;

        axios
            .post('/messages/new', {
                message: input,
                name: 'Rahul Ravindran',
                received: true,
            })
            .then(() => {
                setInput('');
            });
    };

    return (
        <StyledChatWindow>
            <ChatWindowHeader>
                <Avatar
                    margin='0 1rem 0 0'
                    width='45px'
                    height='45px'
                    imgUrl='https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80'
                />
                <Container style={{ flex: 1 }}>
                    <Text as='h2' weight='bold'>
                        Room name
                    </Text>
                    <Text size='caption/large'>Last seen at ...</Text>
                </Container>
                <>
                    {/* <AttachmentIcon /> */}
                    <SearchIcon />
                    <MoreOptionsIcon />
                </>
            </ChatWindowHeader>

            <ChatWindowBody>
                {messages.map((message) => (
                    <Messages message={message} />
                ))}
                <div id='messagesEnd' style={{ visibility: 'hidden' }}></div>
            </ChatWindowBody>

            <ChatWindowMessageContainer>
                <SmileIcon />
                <ChatMessageInputForm>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type='text'
                        name='chatbarInput'
                        id='chatbarInput'
                        placeholder='Type a message'
                    />
                    <Button width='220px' height='100%' onClick={sendMessage} type='submit'>
                        <Text align='center' size='heading6/large'>
                            Send a message
                        </Text>
                    </Button>
                </ChatMessageInputForm>
                <MicIcon />
            </ChatWindowMessageContainer>
        </StyledChatWindow>
    );
};
