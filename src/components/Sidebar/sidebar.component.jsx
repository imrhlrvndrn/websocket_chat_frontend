import { useDebounce } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getChatAvatar, getChatName } from '../../utils';
import { createChat, getUserChats, logoutUser, searchUsers } from '../../http';
import { useAuthentication, useChat, useModalManager } from '../../context';

// Styled conponents
import { Flex, Text } from '../../styled_components';
import StyledSidebar from './sidebar.styledcomponent';

// components
import { Avatar, ChatCard, Button, TextAvatar } from '..';
import {
    SearchIcon,
    StoriesIcon,
    MessageIcon,
    MoreOptionsIcon,
    LogoutIcon,
} from '../../react_icons';

export const Sidebar = () => {
    const navigate = useNavigate();
    const { showModal } = useModalManager();
    const [{ user }] = useAuthentication();
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
            if (success)
                setSearch((prevState) => ({
                    ...prevState,
                    results: data?.users?.filter((searchedUser) => searchedUser?._id !== user?._id),
                }));
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
                data: { success, data },
            } = await createChat({ action_type: 'CREATE_DM_CHAT', friend_user_id: friend_id });

            if (success) {
                setSearch((prevState) => ({ query: '', results: [] }));
                if (data?.exists) return navigate(`/${data?.chat?._id}`);

                console.log('new dm chat => ', data);
                chatDispatch({ type: 'SET_USER_CHATS', payload: [data?.chat, ...user_chats] });
                navigate(`/${data?.chat?._id}`);
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

    return (
        <StyledSidebar>
            <div className='sidebarHeader'>
                <Avatar width='45px' height='45px' url={user?.avatar} />
                <div className>
                    <LogoutIcon
                        style={{ cursor: 'pointer' }}
                        color='whitesmoke'
                        onClick={() => {
                            logoutUser();
                            navigate(`/authenticate`, { replace: true });
                        }}
                    />
                    <Button onClick={() => showModal('CREATE_NEW_GROUP_MODAL')}>New group</Button>
                </div>
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
                {search?.query?.length > 0 && search?.results?.length === 0 ? (
                    <p style={{ padding: '1.2rem', color: 'whitesmoke' }}>No users found</p>
                ) : (
                    search?.results?.map((user) => (
                        <ChatCard
                            key={user?._id}
                            onClick={() => createNewChatWithUser(user?._id)}
                            title={user?.full_name}
                            message=''
                            avatar={user?.avatar}
                        />
                    ))
                )}

                {search?.query?.length === 0 &&
                    user_chats?.map((chat) => (
                        <TextAvatar
                            key={chat?._id}
                            onClick={() => navigate(`/${chat._id}`)}
                            hover={{ cursor: 'pointer' }}
                            padding='1rem'
                            img={{
                                margin: '0 1rem 0 0',
                                url: getChatAvatar({
                                    chat,
                                    logged_user: user,
                                }),
                                alt: `${chat?.title} avatar`,
                            }}
                        >
                            <Flex direction='column' style={{ zIndex: 0, flex: 1 }}>
                                <Text as='h2' weight='medium'>
                                    {getChatName({
                                        chat,
                                        logged_user: user,
                                    })}
                                </Text>
                                <Text
                                    opacity='0.6'
                                    title='The most latest message'
                                    size='caption/large'
                                >
                                    {chat?.latest_message?.content}
                                </Text>
                            </Flex>
                        </TextAvatar>
                    ))}
            </div>
        </StyledSidebar>
    );
};
