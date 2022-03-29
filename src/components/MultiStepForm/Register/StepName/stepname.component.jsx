import { Fragment, useState } from 'react';
import { useTheme, useAuthentication } from '../../../../context';

// styles
import { Text, Flex } from '../../../../styledcomponents';

// components
import { ArrowRight } from '../../../../react_icons';
import { Button, Card, CardContent, CardHeader, Input } from '../../..';

export const StepName = ({ nextStep, previousStep }) => {
    const [{ theme }] = useTheme();
    const [{ new_user }, authDispatch] = useAuthentication();
    const [name, setName] = useState(new_user.full_name || '');

    const saveAndContinue = (event) => {
        event.preventDefault();
        if (!name) return;
        authDispatch({ type: 'SET_NEW_USER', payload: { ...new_user, full_name: name } });

        nextStep();
    };

    return (
        <Fragment>
            <Card>
                <CardHeader text="What's your beautiful full name?" />
                <CardContent>
                    <form onSubmit={saveAndContinue}>
                        <Input
                            value={name}
                            onChange={(event) => setName(() => event.target.value)}
                            placeholder='Enter your full name'
                        />
                        <Flex margin='4rem 0 0 0'>
                            <Button variant='secondary' onClick={previousStep}>
                                Edit password
                            </Button>
                            <Button disabled={!!!name} type='submit'>
                                <Flex>
                                    <Text
                                        weight='600'
                                        margin='0 1rem 0 0'
                                        color={theme.colors.constants.lightText}
                                    >
                                        Choose an avatar
                                    </Text>
                                    <ArrowRight size={30} />
                                </Flex>
                            </Button>
                        </Flex>
                    </form>
                </CardContent>
            </Card>
        </Fragment>
    );
};
