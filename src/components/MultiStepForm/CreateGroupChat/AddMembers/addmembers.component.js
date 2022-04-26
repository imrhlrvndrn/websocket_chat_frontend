import React, { useEffect, useState } from 'react';
import { searchUsers } from '../../../../http';
import { useDebounce } from '../../../../hooks';
import { useAuthentication, useTheme } from '../../../../context';

// styles
import { Flex, Text } from '../../../../styledcomponents';

// components
import { Avatar, Option, Input, Button, Modal } from '../../..';
import { CloseIcon } from '../../../../react_icons';

export const AddMembers = ({ nextStep, previousStep }) => {
    const [{ theme }] = useTheme();
    const [{ user }, authDispatch] = useAuthentication();
    const [selectedUsers, setSelectedUsers] = useState([]);
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
                            selectedUsers.filter(
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
                            onClick={() => {
                                setSearch((prevState) => ({
                                    ...prevState,
                                    results: prevState?.results?.map((selectedUser) =>
                                        selectedUser?._id === user?._id
                                            ? { ...selectedUser, is_selected: true }
                                            : selectedUser
                                    ),
                                }));
                                setSelectedUsers((prevState) => [...prevState, user]);
                            }}
                        >
                            <Flex width='max-content'>
                                <Avatar
                                    width='30px'
                                    height='30px'
                                    margin='0 1rem 0 0'
                                    imgUrl={user?.avatar}
                                    altText={user?.full_name}
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
                <Flex wrap justify='flex-start' style={{maxWidth: '500px'}}>
                    {selectedUsers?.length > 0 &&
                        selectedUsers?.map((user) => (
                            <Flex width='max-content' margin='1rem 1rem 1rem 0'>
                                <Avatar
                                    width='30px'
                                    height='30px'
                                    margin='0 0.5rem 0 0'
                                    imgUrl={user?.avatar}
                                    altText={user?.full_name}
                                />
                                <Text size='body/small' width='max-content'>
                                    {user?.full_name}
                                </Text>
                                <CloseIcon
                                    color={theme?.colors?.text}
                                    onClick={() => {
                                        setSearch((prevState) => ({
                                            ...prevState,
                                            results: prevState?.results?.map((selectedUser) =>
                                                selectedUser?._id === user?._id
                                                    ? { ...selectedUser, is_selected: false }
                                                    : selectedUser
                                            ),
                                        }));
                                        setSelectedUsers((prevState) =>
                                            prevState.filter(
                                                (selectedUser) => selectedUser._id !== user?._id
                                            )
                                        );
                                    }}
                                />
                            </Flex>
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
