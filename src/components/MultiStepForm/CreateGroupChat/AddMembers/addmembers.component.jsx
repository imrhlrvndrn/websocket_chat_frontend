import React, { useEffect, useState } from 'react';
import { searchUsers } from '../../../../http';
import { useDebounce } from '../../../../hooks';
import { useAuthentication, useChat, useModalManager, useTheme } from '../../../../context';

// styles
import { Flex, Text } from '../../../../styled_components';

// components
import { UserPill, Avatar, Option, Input, Button, Modal } from '../../..';
import { CloseIcon } from '../../../../react_icons';

export const AddMembers = ({ nextStep, previousStep }) => {
    const [{ theme }] = useTheme();
    const { hideModal } = useModalManager();
    const [{ new_chat }, chatDispatch] = useChat();
    const [{ user }, authDispatch] = useAuthentication();
    const [search, setSearch] = useState({ query: '', results: [], loading: false });
    const debouncedSearch = useDebounce(search?.query, 500);

    const searchForUsers = async () => {
        if (!debouncedSearch) {
            setSearch((prevState) => ({ query: '', results: [], loading: false }));
            return;
        }

        try {
            // fetch users
            setSearch((prevState) => ({ ...prevState, loading: true }));
            const {
                data: { success, data, toast },
            } = await searchUsers(search?.query);
            if (success)
                setSearch((prevState) => ({
                    ...prevState,
                    results: data?.users
                        ?.map((user) =>
                            new_chat?.users?.filter(
                                (selected_user) => selected_user?._id === user?._id
                            )?.length > 0
                                ? { ...user, is_selected: true }
                                : { ...user, is_selected: false }
                        )
                        ?.filter((searched_user) => searched_user._id !== user?._id),
                }));
        } catch (error) {
            console.error(error);
        } finally {
            setSearch((prevState) => ({ ...prevState, loading: false }));
        }
    };

    const renderSearchResults = () => {
        if (search?.loading) return <Text>Searching users. Please wait... </Text>;
        else if (!search?.loading && search?.results?.length > 0)
            return search?.results?.map(
                (user) =>
                    !user?.is_selected && (
                        <Option
                            tabIndex={1}
                            onClick={() => {
                                setSearch((prevState) => ({
                                    ...prevState,
                                    results: prevState?.results?.map((selectedUser) =>
                                        selectedUser?._id === user?._id
                                            ? { ...selectedUser, is_selected: true }
                                            : selectedUser
                                    ),
                                }));
                                chatDispatch({
                                    type: 'SET_NEW_CHAT',
                                    payload: {
                                        ...new_chat,
                                        users: [...new_chat?.users, user],
                                    },
                                });
                            }}
                        >
                            <Flex width='max-content'>
                                <Avatar
                                    size='30px'
                                    margin='0 1rem 0 0'
                                    url={user?.avatar}
                                    alt={user?.full_name}
                                />
                                <Text width='max-content'>{user?.full_name}</Text>
                            </Flex>
                        </Option>
                    )
            );
        else if (!search?.query) return null;
        else if (!search?.loading && search?.results?.length === 0)
            return <Text>No users found.</Text>;
    };

    useEffect(() => {
        searchForUsers();
    }, [debouncedSearch]);

    return (
        <Modal title={{ content: 'Add members to your group' }}>
            <form onSubmit={() => nextStep()}>
                <Input
                    placeholder='Search users by name or email'
                    onChange={(event) =>
                        setSearch((prevState) => ({ ...prevState, query: event?.target?.value }))
                    }
                    style={{ backgroundColor: theme?.colors?.mediumBackground }}
                />
                {/* Selected user pills */}
                <Flex wrap justify='flex-start' style={{ maxWidth: '500px' }}>
                    {new_chat?.users?.length > 0 &&
                        new_chat?.users?.map((user) => (
                            <UserPill
                                key={user?._id}
                                user={user}
                                onClose={() => {
                                    setSearch((prevState) => ({
                                        ...prevState,
                                        results: prevState?.results?.map((selectedUser) =>
                                            selectedUser?._id === user?._id
                                                ? { ...selectedUser, is_selected: false }
                                                : selectedUser
                                        ),
                                    }));
                                    chatDispatch({
                                        type: 'SET_NEW_CHAT',
                                        payload: {
                                            ...new_chat,
                                            users: new_chat?.users?.filter(
                                                (selectedUser) => selectedUser._id !== user?._id
                                            ),
                                        },
                                    });
                                }}
                            />
                        ))}
                </Flex>
                {/* Searched users */}
                <Flex direction='column' margin='2rem 0'>
                    {renderSearchResults()}
                </Flex>
                <Flex margin='4rem 0 0 0'>
                    <Button variant='secondary' onClick={previousStep}>
                        Edit group name
                    </Button>
                    <Button type='submit'>Set a display image</Button>
                </Flex>
            </form>
        </Modal>
    );
};
