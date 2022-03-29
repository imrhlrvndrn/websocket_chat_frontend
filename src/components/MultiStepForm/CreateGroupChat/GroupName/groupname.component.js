import { useState } from 'react';
import { useTheme } from '../../../../context';

// styles
import { Flex } from '../../../../styledcomponents';

// component
import { Card, CardContent, CardHeader, Button, Input } from '../../..';

export const GroupName = ({ nextStep, previousStep }) => {
    const [{ theme }] = useTheme();
    const [group, setGroup] = useState({ name: '', members: [] });

    return (
        <Card style={{ zIndex: '1', backgroundColor: theme?.colors?.darkBackground }}>
            <CardHeader text='Choose a group name' />
            <CardContent>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        nextStep();
                    }}
                >
                    <Input
                        style={{ backgroundColor: theme?.colors?.mediumBackground }}
                        value={group?.name}
                        onChange={(event) =>
                            setGroup((prevState) => ({
                                ...prevState,
                                name: event.target.value,
                            }))
                        }
                        id='group_name'
                        placeholder='Enter your group name here'
                    />
                    <Flex style={{ flex: 1 }} margin='2rem 0 0 0'>
                        <Button variant='secondary' onClick={previousStep}>
                            Don't create group
                        </Button>
                        <Button disabled={!!!group?.name} type='submit'>
                            Add members
                        </Button>
                    </Flex>
                </form>
            </CardContent>
        </Card>
    );
};
