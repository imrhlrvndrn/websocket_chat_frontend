import { useDebounce } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getChatAvatar, getDMChatName } from './sidebar.utils';
import { createChat, getUserChats, searchUsers } from '../../http';
import { useAuthentication, useChat, useModalManager } from '../../context';

// Styled conponents
import { Flex, Text } from '../../styled_components';
import StyledSidebar from './sidebar.styledcomponent';

// components
import { Avatar, ChatCard, Button, TextAvatar } from '..';
import { SearchIcon, StoriesIcon, MessageIcon, MoreOptionsIcon } from '../../react_icons';

export const Sidebar = () => {
    const navigate = useNavigate();
    const { showModal } = useModalManager();
    const [{ user }, authDispatch] = useAuthentication();
    const [{ user_chats }, chatDispatch] = useChat();
    const [search, setSearch] = useState({
        query: '',
        results: [],
    });
    const debouncedSearch = useDebounce(search.query, 500);

    const searchForUsers = async () => {
        if (!debouncedSearch) {
            setSearch((prevState) => ({ query: '', results: [] }));
            return;
        }

        try {
            // fetch users
            const {
                data: { success, data, toast },
            } = await searchUsers(search.query);
            if (success) setSearch((prevState) => ({ ...prevState, results: data.users }));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUserChats = async () => {
        try {
            const {
                data: { success, data, toast },
            } = await getUserChats(user?._id);

            if (success) {
                chatDispatch({ type: 'SET_USER_CHATS', payload: data?.chats });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const createNewChatWithUser = async (friend_id) => {
        try {
            const {
                data: { success, data, toast },
            } = await createChat({ action_type: 'CREATE_DM_CHAT', friend_user_id: friend_id });

            if (success) {
                setSearch((prevState) => ({ query: '', results: [] }));
                chatDispatch({ type: 'SET_USER_CHATS', payload: [...user_chats, data?.chat] });
            }
        } catch (error) {
            console.error(error);
            alert(`Couldn't create chat`);
        }
    };

    useEffect(() => {
        searchForUsers();
    }, [debouncedSearch]);

    useEffect(() => {
        (async () => await fetchUserChats())();
    }, []);

    useEffect(() => {}, [user_chats]);
    console.log('user chats => ', user_chats);

    console.log('user => ', user);

    return (
        <StyledSidebar>
            <div className='sidebar__header'>
                <Avatar width='45px' height='45px' url={user?.avatar} />
                {/* <div className='sidebar__header__icons'>
                    <StoriesIcon />
                    <MessageIcon />
                    <MoreOptionsIcon />
                </div> */}
                <Button onClick={() => showModal('CREATE_NEW_GROUP_MODAL')}>New group</Button>
            </div>
            <div className='sidebarSearchContainer'>
                <div className='sidebarSearchContainer__input'>
                    <SearchIcon />
                    <input
                        type='text'
                        value={search?.query}
                        onChange={(event) =>
                            setSearch((prevState) => ({ ...prevState, query: event.target.value }))
                        }
                        name='searchBar'
                        id='searchBar'
                        placeholder='Search or start a new chat'
                    />
                </div>
            </div>
            <div className='sidebarChat'>
                {search?.query?.length > 0 &&
                    search?.results?.map((user) => (
                        <ChatCard
                            onClick={() => createNewChatWithUser(user?._id)}
                            title={user?.full_name}
                            message=''
                            avatar={user?.avatar}
                        />
                    ))}

                {search?.query?.length === 0 &&
                    user_chats?.map((chat) => (
                        <TextAvatar
                            onClick={() => navigate(`/${chat._id}`)}
                            hover={{ cursor: 'pointer' }}
                            padding='1rem'
                            img={{
                                margin: '0 1rem 0 0',
                                url: chat?.is_group_chat
                                    ? chat?.avatar ||
                                      'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80'
                                    : getChatAvatar({ logged_user: user, chat_users: chat?.users }),
                                alt: `${chat?.title} avatar`,
                            }}
                        >
                            <Flex direction='column' style={{ zIndex: 0, flex: 1 }}>
                                <Text as='h2' weight='medium'>
                                    {chat?.is_group_chat
                                        ? chat?.name
                                        : getDMChatName({
                                              logged_user: user,
                                              chat_users: chat?.users,
                                          })}
                                </Text>
                                <Text
                                    opacity='0.6'
                                    title='The most latest message'
                                    size='caption/large'
                                >
                                    The most latest message
                                </Text>
                            </Flex>
                        </TextAvatar>
                    ))}
            </div>
        </StyledSidebar>
    );
};
