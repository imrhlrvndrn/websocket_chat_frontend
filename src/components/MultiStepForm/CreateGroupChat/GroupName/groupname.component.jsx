import React, { useState } from 'react';
import { useChat, useTheme } from '../../../../context';

// styles
import { Flex } from '../../../../styled_components';

// component
import { Button, Input, Modal } from '../../..';

export const GroupName = ({ nextStep, previousStep }) => {
    const [{ theme }] = useTheme();
    const [{ new_chat }, chatDispatch] = useChat();
    // const [group, setGroup] = useState({ name: '', members: [] });

    return (
        <Modal title={{ content: 'Choose a group name' }}>
            {/* <Card style={{ zIndex: '1', backgroundColor: theme?.colors?.darkBackground }}> */}
            {/* <CardHeader text='Choose a group name' /> */}
            {/* <CardContent> */}
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    nextStep();
                }}
            >
                <Input
                    style={{ backgroundColor: theme?.colors?.mediumBackground }}
                    value={new_chat?.name}
                    onChange={(event) =>
                        chatDispatch({
                            type: 'SET_NEW_CHAT',
                            payload: {
                                ...new_chat,
                                name: event?.target?.value,
                            },
                        })
                    }
                    id='group_name'
                    placeholder='Enter your group name here'
                />
                <Flex style={{ flex: 1 }} margin='2rem 0 0 0'>
                    <Button variant='secondary' onClick={previousStep}>
                        Don't create group
                    </Button>
                    <Button disabled={!!!new_chat?.name} type='submit'>
                        Add members
                    </Button>
                </Flex>
            </form>
            {/* </CardContent> */}
            {/* </Card> */}
        </Modal>
    );
};
