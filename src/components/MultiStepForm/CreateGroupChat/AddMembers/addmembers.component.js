import React, { useEffect, useState } from 'react';
import { searchUsers } from '../../../../http';
import { useDebounce } from '../../../../hooks';
import { useAuthentication, useTheme } from '../../../../context';

// styles
import { Flex, Text } from '../../../../styledcomponents';

// components
import { Avatar, Option, Input, Button, Modal } from '../../..';

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
                {selectedUsers?.length > 0 &&
                    selectedUsers?.map((user) => (
                        <Flex margin='1rem 1rem 1rem 0'>
                            <Avatar
                                width='30px'
                                height='30px'
                                margin='0 0.5rem 0 0'
                                imgUrl={user?.avatar}
                                altText={user?.full_name}
                            />
                            <Text size='body/small'>{user?.full_name}</Text>
                        </Flex>
                    ))}
                {/* Searched users */}
                <Flex direction='column' margin='2rem 0'>
                    {search?.loading ? (
                        <Text>Searching users</Text>
                    ) : (
                        search?.results?.map(
                            (user) =>
                                !user?.is_selected && (
                                    <Flex
                                        margin='0 0 1rem 0'
                                        onClick={() => {
                                            setSearch((prevState) => ({
                                                ...prevState,
                                                results: prevState?.results?.map((selectedUser) =>
                                                    selectedUser?._id === user?._id
                                                        ? { ...selectedUser, is_selected: true }
                                                        : { ...selectedUser, is_selected: false }
                                                ),
                                            }));
                                            setSelectedUsers((prevState) => [...prevState, user]);
                                        }}
                                    >
                                        <Avatar
                                            width='40px'
                                            height='40px'
                                            margin='0 1rem 0 0'
                                            imgUrl={user?.avatar}
                                            altText={user?.full_name}
                                        />
                                        <Text>{user?.full_name}</Text>
                                    </Flex>
                                )
                        )
                    )}
                    <Option>
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
