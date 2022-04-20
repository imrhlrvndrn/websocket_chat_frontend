import React, { useState } from 'react';
import { useTheme } from '../../../../context';

// styles
import { Flex, Text } from '../../../../styledcomponents';

// components
import { Avatar, Card, CardHeader, CardContent, Input, Button } from '../../..';
import { Modal } from '../../../Modals/Modal/modal.component';

export const AddMembers = ({ nextStep, previousStep }) => {
    const [{ theme }] = useTheme();
    const [isSearchingUsers, setIsSearchingUsers] = useState(false);
    const [search, setSearch] = useState({ query: '', results: [] });
    const [selectedUsers, setSelectedUsers] = useState([]);

    // const searchForUsers = async () => {
    //     if (!debouncedSearch) {
    //         setSearch((prevState) => ({ query: '', results: [] }));
    //         return;
    //     }

    //     try {
    //         // fetch users
    //         const {
    //             data: { success, data, toast },
    //         } = await searchUsers(search.query);
    //         if (success) setSearch((prevState) => ({ ...prevState, results: data.users }));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <Modal title={{ content: 'Add members to your group' }}>
            <form onSubmit={() => nextStep()}>
                <Input
                    placeholder='Search users by name or email'
                    style={{ backgroundColor: theme?.colors?.mediumBackground }}
                />
                {/* Selected user pills */}
                {/* Searched users */}
                {isSearchingUsers
                    ? 'searching users'
                    : search?.results?.map((user) => (
                          <Flex direction='column'>
                              <Flex>
                                  <Avatar
                                      width='60px'
                                      height='60px'
                                      imgUrl={user?.avatar}
                                      altText={user?.full_name}
                                  />
                                  <Text>{user?.full_name}</Text>
                              </Flex>
                          </Flex>
                      ))}
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
