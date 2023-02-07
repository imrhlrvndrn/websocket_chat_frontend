import { useNavigate } from 'react-router-dom';
import { createChat, execChatOperation, userBlocking } from '../../http';
import React, { useEffect, useState } from 'react';
import { getChatAvatar, getChatName, isUserBlocked } from '../../utils';
import { useAuthentication, useChat, useModalManager, useTheme } from '../../context';

// icons
import { ReactComponent as CloseIcon } from '../../react_icons/close-24px.svg';
import { ReactComponent as AddUserIcon } from '../../react_icons/add_user.svg';
import { ReactComponent as LinkIcon } from '../../react_icons/link.svg';

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
import { useChatRequests, useExternalEventDetector } from '../../hooks';
import { MoreOptionsIcon } from '../../react_icons';

// Images

export const ChatInformation = ({ setShowChatInfo }) => {
    const [{ theme }] = useTheme();
    const navigate = useNavigate();
    const { blockUser } = useChatRequests();
    const [{ open_chat, user_chats }, chatDispatch] = useChat();
    const { showModal } = useModalManager();
    const [{ user }, authDispatch] = useAuthentication();
    const [isBlocked, setIsBlocked] = useState({ value: false, user: '' });
    const [dropdownMapping, setDropdownMapping] = useState([]);
    const { elementRef } = useExternalEventDetector([
        'click',
        () => setShowChatInfo((prevState) => false),
    ]);
    const same_user = (_id) => _id === user?._id;
    const is_owner = (_id) => _id === open_chat?.created_by;
    let dropdownMenu = (user_id) =>
        !is_owner(user?._id)
            ? [
                  {
                      label: 'Message',
                      event_handler: () => createNewChatWithUser(user_id),
                  },
              ]
            : [
                  {
                      label: 'Message',
                      event_handler: () => createNewChatWithUser(user_id),
                  },
                  {
                      label: 'Remove from group',
                      event_handler: async () => {
                          try {
                              const {
                                  data: { success },
                              } = await execChatOperation({
                                  chatId: open_chat?._id,
                                  action: 'remove-user',
                                  data: {
                                      remove_members: [user_id],
                                  },
                              });
                              if (success)
                                  chatDispatch({
                                      type: 'SET_OPEN_CHAT',
                                      payload: {
                                          ...open_chat,
                                          users: open_chat?.users?.filter(
                                              (filterUser) => user_id !== filterUser?._id
                                          ),
                                      },
                                  });
                          } catch (error) {
                              console.error(error);
                          }
                      },
                  },
              ];

    const deleteChat = async (chat_id) => {
        try {
            const {
                data: { success },
            } = await execChatOperation({ chatId: chat_id, action: 'delete' });
            if (success) {
                chatDispatch({
                    type: 'SET_USER_CHATS',
                    payload: user_chats?.filter((chat) => chat?._id !== chat_id),
                });
                navigate('/', { replace: true });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const exitGroup = async () => {
        try {
            const {
                data: { success },
            } = await execChatOperation({
                chatId: open_chat?._id,
                action: 'remove-user',
                data: {
                    remove_members: [user?._id],
                },
            });
            if (success)
                chatDispatch({
                    type: 'SET_USER_CHATS',
                    payload: user_chats?.filter((chat) => chat?._id !== open_chat?._id),
                });
            navigate(`/${user_chats[0]?._id}`);
        } catch (error) {
            console.error(error);
        }
    };

    const createNewChatWithUser = async (friend_id) => {
        try {
            const {
                data: { success, data },
            } = await createChat({ action_type: 'CREATE_DM_CHAT', friend_user_id: friend_id });

            if (success) {
                if (data?.exists) return navigate(`/${data?.chat?._id}`);

                chatDispatch({ type: 'SET_USER_CHATS', payload: [data?.chat, ...user_chats] });
                navigate(`/${data?.chat?._id}`);
            }
        } catch (error) {
            console.error(error);
            alert(`Couldn't create chat`);
        }
    };

    const renderChatMembers = () => {
        return open_chat?.users?.map((user) => {
            return (
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
                    <Text>
                        {same_user(user?._id) ? 'You' : user?.full_name}
                        {is_owner(user?._id) ? ' (Owner)' : ''}
                    </Text>
                    {open_chat?.is_group_chat && !same_user(user?._id) && (
                        <>
                            <MoreOptionsIcon
                                onClick={() =>
                                    setDropdownMapping((prevState) =>
                                        prevState?.map((menu) =>
                                            menu?.user === user?._id
                                                ? { ...menu, visible: !menu?.visible }
                                                : menu
                                        )
                                    )
                                }
                                style={{ cursor: 'pointer', fill: theme?.colors?.icon }}
                            />
                            <DropdownMenu
                                menus={dropdownMenu(user?._id)}
                                setDropdownMapping={setDropdownMapping}
                                visible={
                                    dropdownMapping?.find((menu) => menu?.user === user?._id)
                                        ?.visible
                                }
                            />
                        </>
                    )}
                </TextAvatar>
            );
        });
    };

    useEffect(() => {
        setDropdownMapping((prevState) =>
            open_chat?.users?.map((user) => ({ user: user?._id, visible: false }))
        );
    }, [open_chat?.users]);

    // Check once, if the user is blocked by the logged user
    useEffect(() => {
        if (open_chat?.is_group_chat) return;

        const is_blocked = isUserBlocked({ users: open_chat?.users, logged_user: user });
        // ! Just know who blocked who And only allow the one who initiated the block to unblock. Until then disable the block
        // ! feature for the other user
        setIsBlocked(() => is_blocked);
    }, [open_chat?._id, user?.blocked]);

    console.log('open_chat users => ', open_chat?.users);

    return (
        <StyledChatInfo ref={elementRef}>
            <ChatInfoHeader>
                <CloseIcon
                    style={{ fill: theme?.colors?.icon }}
                    onClick={() => setShowChatInfo((prevState) => !prevState)}
                />
                <Text>{!open_chat?.is_group_chat ? 'Chat info' : 'Group info'}</Text>
            </ChatInfoHeader>
            <ChatInfoBody>
                <img
                    src={getChatAvatar({ logged_user: user, chat: open_chat })}
                    alt='user avatar'
                    className='chatAvatar'
                />
                <Text align='center' size='heading4/large'>
                    {getChatName({ logged_user: user, chat: open_chat })}
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
                                    <AddUserIcon style={{ fill: theme?.colors?.icon }} />
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
                    {open_chat?.is_group_chat && (
                        <>
                            {is_owner(user?._id) && (
                                <Flex
                                    margin='2rem 0 0 0'
                                    padding='1rem 0'
                                    borderRadius='10px'
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: theme?.colors?.lightBackground,
                                    }}
                                >
                                    <Text
                                        width='max-content'
                                        color={theme?.colors?.constants?.danger?.medium}
                                    >
                                        Delete group
                                    </Text>
                                </Flex>
                            )}
                            <Flex
                                margin='1rem 0 0 0'
                                padding='1rem 0'
                                borderRadius='10px'
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: theme?.colors?.lightBackground,
                                }}
                                onClick={() => exitGroup()}
                            >
                                <Text
                                    width='max-content'
                                    color={theme?.colors?.constants?.danger?.medium}
                                >
                                    Leave group
                                </Text>
                            </Flex>
                        </>
                    )}
                    {!open_chat?.is_group_chat && (
                        <>
                            <Flex
                                margin='2rem 0 0 0'
                                padding='1rem 0'
                                borderRadius='10px'
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: theme?.colors?.lightBackground,
                                }}
                                onClick={() =>
                                    blockUser(
                                        open_chat?.users?.filter(
                                            (chatUser) => chatUser?._id !== user?._id
                                        )?.[0]?._id,
                                        isBlocked
                                    )
                                }
                            >
                                <Text
                                    width='max-content'
                                    color={theme?.colors?.constants?.danger?.medium}
                                >
                                    {isBlocked?.value ? 'Unblock' : 'Block'}{' '}
                                    {getChatName({ logged_user: user, chat: open_chat })}
                                </Text>
                            </Flex>
                            <Flex
                                margin='1rem 0 0 0'
                                padding='1rem 0'
                                borderRadius='10px'
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: theme?.colors?.lightBackground,
                                }}
                                onClick={() => deleteChat(open_chat?._id)}
                            >
                                <Text width='max-content' color={theme?.colors?.text}>
                                    Erase & Delete Chat
                                </Text>
                            </Flex>
                        </>
                    )}
                </ChatParticipantsContainer>
            </ChatInfoBody>
        </StyledChatInfo>
    );
};
