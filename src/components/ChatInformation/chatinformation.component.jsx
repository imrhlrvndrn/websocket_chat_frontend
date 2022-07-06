import { execChatOperation, fetchChat } from '../../http';
import React, { useEffect, useState } from 'react';
import { AddUserIcon, CloseIcon, LinkIcon } from '../../react_icons';
import { getChatAvatar, getDMChatName } from '../Sidebar/sidebar.utils';
import { useAuthentication, useChat, useModalManager, useTheme } from '../../context';
import { ReactComponent as ArrowRight } from '../../react_icons/arrow_right.svg';

// Styled components
import { Flex, Text } from '../../styled_components';
import {
    StyledChatInfo,
    ChatInfoHeader,
    ChatInfoBody,
    ChatParticipantsContainer,
} from './chatinformation.styledcomponent';

// components
import { TextAvatar } from '..';
import { DropdownMenu } from '../Dropdown/dropdown.component';

// Images

export const ChatInformation = (props) => {
    const [{ theme }] = useTheme();
    const [{ open_chat }, chatDispatch] = useChat();
    const { showModal } = useModalManager();
    const [{ user }] = useAuthentication();
    const [isBlocked, setIsBlocked] = useState(false);
    const [dropdownMapping, setDropdownMapping] = useState([]);

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

    const renderChatMembers = () => {
        return open_chat?.users?.map((user) => (
            <TextAvatar
                key={user?._id}
                id={`_${user?._id}`}
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
                <ArrowRight
                    onClick={() =>
                        setDropdownMapping((prevState) =>
                            prevState?.map((menu) =>
                                menu?.user === user?._id
                                    ? { ...menu, visible: !menu?.visible }
                                    : menu
                            )
                        )
                    }
                    style={{ cursor: 'pointer', stroke: theme?.colors?.icon }}
                />
                <DropdownMenu
                    menus={[
                        {
                            label: 'Message',
                            event_handler: () => {},
                        },
                        {
                            label: 'Remove from group',
                            event_handler: async () => {
                                try {
                                    const {
                                        data: { success, data },
                                    } = await execChatOperation({
                                        chatId: open_chat?._id,
                                        action: 'remove-user',
                                        data: {
                                            remove_members: [user?._id],
                                        },
                                    });
                                    if (success)
                                        chatDispatch({
                                            type: 'SET_OPEN_CHAT',
                                            payload: {
                                                ...open_chat,
                                                users: open_chat?.users?.filter(
                                                    (filterUser) => user?._id !== filterUser?._id
                                                ),
                                            },
                                        });
                                } catch (error) {
                                    console.error(error);
                                }
                            },
                        },
                    ]}
                    setDropdownMapping={setDropdownMapping}
                    visible={dropdownMapping?.find((menu) => menu?.user === user?._id)?.visible}
                />
            </TextAvatar>
        ));
    };

    useEffect(() => {
        setDropdownMapping((prevState) =>
            open_chat?.users?.map((user) => ({ user: user?._id, visible: false }))
        );
    }, [open_chat?.users]);

    console.log('dropdownMapping => ', dropdownMapping);

    return (
        <StyledChatInfo>
            <ChatInfoHeader>
                <CloseIcon onClick={() => {}} />
                <Text>{!open_chat?.is_group_chat ? 'Chat info' : 'Group info'}</Text>
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
                            <Flex
                                hover={{ cursor: 'pointer' }}
                                margin='0 0 1rem 0'
                                onClick={() => showModal('CREATE_GROUP_INVITE')}
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
                                    <LinkIcon color={theme?.colors?.icon} />
                                </Flex>
                                <Text>Invite to group via link</Text>
                            </Flex>
                        </>
                    )}
                    {renderChatMembers()}
                </ChatParticipantsContainer>
            </ChatInfoBody>
        </StyledChatInfo>
    );
};
