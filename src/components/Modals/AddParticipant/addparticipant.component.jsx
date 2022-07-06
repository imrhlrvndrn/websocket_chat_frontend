import { useEffect, useState } from 'react';
import { execChatOperation, searchUsers } from '../../../http';
import { useDebounce } from '../../../hooks';
import { useAuthentication, useChat, useModalManager, useTheme } from '../../../context';

// styles
import { Flex, Text } from '../../../styled_components';

// components
import { Modal, Input, UserPill, Avatar, Option, Button } from '../../';

export const AddParticipant = () => {
    const [{ theme }] = useTheme();
    const { hideModal } = useModalManager();
    const [{ open_chat, new_chat }, chatDispatch] = useChat();
    const [{ user }, authDispatch] = useAuthentication();
    const [newMembers, setNewMembers] = useState([]);
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
                            newMembers?.filter((selected_user) => selected_user?._id === user?._id)
                                ?.length > 0
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
                                setNewMembers((prevState) => [...prevState, user]);
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

    const addMembersToGroup = async (event) => {
        event.preventDefault();

        try {
            const {
                data: { success, data },
            } = await execChatOperation({
                chatId: open_chat?._id,
                action: 'add-user',
                data: { new_members: newMembers?.map((user) => user?._id) },
            });
            if (success) {
                //! Implement a false lie mechanism since the response doesn't contain necessary data
                // ! to display on the UI
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        (async () => await searchForUsers())();
    }, [debouncedSearch]);

    return (
        <Modal title={{ content: 'Add members to your group' }}>
            <form style={{ width: '500px' }} onSubmit={addMembersToGroup}>
                <Input
                    placeholder='Search users by name or email'
                    onChange={(event) =>
                        setSearch((prevState) => ({ ...prevState, query: event?.target?.value }))
                    }
                    style={{ backgroundColor: theme?.colors?.mediumBackground }}
                />
                {/* Selected user pills */}
                <Flex wrap justify='flex-start' style={{ maxWidth: '500px' }}>
                    {newMembers?.length > 0 &&
                        newMembers?.map((user) => (
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
                                    setNewMembers((prevState) =>
                                        prevState?.filter(
                                            (selectedUser) => selectedUser._id !== user?._id
                                        )
                                    );
                                }}
                            />
                        ))}
                </Flex>

                {/* Searched users */}
                <Flex direction='column' margin='2rem 0'>
                    {renderSearchResults()}
                </Flex>
                <Flex margin='4rem 0 0 0'>
                    <Button variant='secondary' onClick={() => hideModal()}>
                        Cancel
                    </Button>
                    <Button disabled={!!!open_chat?._id} type='submit'>
                        Add Members
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
};
