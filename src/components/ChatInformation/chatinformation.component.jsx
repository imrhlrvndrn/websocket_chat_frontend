import { fetchChat } from '../../http';
import { useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { AddUserIcon, CloseIcon, LinkIcon } from '../../react_icons';
import { getChatAvatar, getDMChatName } from '../Sidebar/sidebar.utils';
import { useAuthentication, useChat, useModalManager, useTheme } from '../../context';

// Styled components
import { Flex, Text } from '../../styledcomponents';
import {
    StyledChatInfo,
    ChatInfoHeader,
    ChatInfoBody,
    ChatParticipantsContainer,
} from './chatinformation.styledcomponent';

// components
import { ContextMenu, TextAvatar } from '..';

// Images

export const ChatInformation = (props) => {
    const inputRef = useRef(null);
    const formRef = useRef(null);
    const [{ theme }] = useTheme();
    const [{ open_chat }] = useChat();
    const { showModal } = useModalManager();
    const [{ user }] = useAuthentication();
    const [isBlocked, setIsBlocked] = useState(false);

    // const chatInfoDetails =
    //     chatDetails?.members?.length <= 2
    //         ? [
    //               { title: '', content: `${chatInfoMember?.name}` },
    //               { title: 'About', content: `${chatInfoMember?.bio}` },
    //               { title: 'Email', content: `${chatInfoMember?.email}` },
    //           ]
    //         : [
    //               { title: '', content: `${chatDetails?.name}` },
    //               { title: 'Description', content: `${chatDetails?.description}` },
    //               {
    //                   title: `${chatDetails?.members?.length} Participants`,
    //                   content: chatDetails?.members,
    //               },
    //           ];

    // useEffect(() => {
    //     console.log('cahtinfo memebrid: ', chatInfoMember?.memberId);
    //     if (user?.blocked_contacts?.includes(chatInfoMember?.memberId)) setIsBlocked(true);
    //     else setIsBlocked(false);
    // }, [chatInfoMember]);

    // ! Write logic to avoid blocking the same person again and again
    const blockContact = () => {
        // ! Update logic to actually remove the property without mutating the Object
        // db.collection('members')
        //     .doc(`${user?.userId}`)
        //     .set(
        //         {
        //             blocked_contacts: [...user?.blocked_contacts, chatInfoMember?.memberId],
        //         },
        //         { merge: true }
        //     );
    };

    const unblockContact = () => {
        // db.collection('members')
        //     .doc(`${user?.userId}`)
        //     .set(
        //         {
        //             blocked_contacts: [
        //                 ...user?.blocked_contacts.filter(
        //                     (member) => member !== chatInfoMember?.memberId
        //                 ),
        //             ],
        //         },
        //         { merge: true }
        //     );
    };

    const exitGroup = () => {};

    return (
        <StyledChatInfo>
            <ChatInfoHeader>
                <CloseIcon
                    onClick={() => dispatch({ type: 'SET_CHAT_INFO', chatInfo: !chatInfo })}
                />
                <Text>
                    {/* {chatDetails?.members?.length <= 2 ? 'Chat info' : 'Group info'} */}
                    Chat Info
                </Text>
            </ChatInfoHeader>
            <ChatInfoBody>
                <img
                    src={
                        open_chat?.is_group_chat
                            ? open_chat?.avatar ||
                              'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80'
                            : getChatAvatar({ logged_user: user, chat_users: open_chat?.users })
                    }
                    alt='user avatar'
                    className='chatAvatar'
                />
                <Text align='center' size='heading4/large'>
                    {open_chat?.is_group_chat
                        ? open_chat?.name
                        : getDMChatName({
                              logged_user: user,
                              chat_users: open_chat?.users,
                          })}
                </Text>
                <Text align='center' size='body/small' opacity='0.6'>
                    {open_chat?.users?.length} participants
                </Text>
                <ChatParticipantsContainer>
                    <Text margin='0 0 1rem 0'>{open_chat?.users?.length} participants</Text>
                    {open_chat?.is_group_chat && (
                        <>
                            <Flex
                                hover={{ cursor: 'pointer' }}
                                margin='0 0 1rem 0'
                                onClick={() => showModal('ADD_PARTICIPANT')}
                            >
                                <Flex
                                    width='50px'
                                    height='50px'
                                    borderRadius='50%'
                                    margin='0 1rem 0 0'
                                    style={{
                                        backgroundColor: theme?.colors?.constants?.primary?.medium,
                                    }}
                                >
                                    <AddUserIcon color={theme?.colors?.icon} />
                                </Flex>
                                <Text>Add members</Text>
                            </Flex>
                            <Flex hover={{ cursor: 'pointer' }} margin='0 0 1rem 0'>
                                <Flex
                                    width='50px'
                                    height='50px'
                                    borderRadius='50%'
                                    margin='0 1rem 0 0'
                                    style={{
                                        backgroundColor: theme?.colors?.constants?.primary?.medium,
                                    }}
                                >
                                    <LinkIcon color={theme?.colors?.icon} />
                                </Flex>
                                <Text>Invite to group via link</Text>
                            </Flex>
                        </>
                    )}
                    {open_chat?.users?.map((user) => (
                        <ContextMenu menu={['hello', 'bye']}>
                            <TextAvatar
                                img={{
                                    url:
                                        user?.avatar ||
                                        'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
                                    alt: 'user avatar',
                                    margin: '0 1rem 0 0',
                                }}
                                margin='0 0 1rem 0'
                            >
                                <Text>{user?.full_name}</Text>
                            </TextAvatar>
                        </ContextMenu>
                    ))}
                </ChatParticipantsContainer>
                {/* <img src={open_chat?.photoURL || WhatsAppDefault} alt={open_chat?.name} /> */}
                {/* {chatInfoDetails.map(({ title, content }) => (
                    <ChatInfoContentGroup title={title} content={content} />
                ))} */}
                {/* {open_chat?.members?.length <= 2 ? (
                    user?.userId !== chatInfoMember?.memberId && (
                        <ChatInfoContentGroup
                            content={isBlocked ? 'Unblock' : 'Block'}
                            color='239, 105, 122'
                            onClick={() => {
                                isBlocked ? unblockContact() : blockContact();
                                setIsBlocked(!isBlocked);
                            }}
                        />
                    )
                ) : (
                    // ! Write more logic for this
                    <ChatInfoContentGroup
                        content='Exit Group'
                        color='239, 105, 122'
                        onClick={exitGroup}
                    />
                )} */}
                <form
                    ref={formRef}
                    onSubmit={(event) => {
                        event.preventDefault();
                        console.log('The form is submitted!!!!');
                    }}
                >
                    <input type='submit' ref={inputRef} />
                </form>

                <button onClick={() => inputRef.current.click()}>Submit the form</button>
            </ChatInfoBody>
        </StyledChatInfo>
    );
};
