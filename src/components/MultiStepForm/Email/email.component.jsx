import React, { useState } from 'react';
import { sendOtp } from '../../../http';
import { useTheme, useAuthentication } from '../../../context';

// styles
import { Flex, Text } from '../../../styled_components';

// components
import { Button, Input } from '../..';
import { ArrowRight } from '../../../react_icons';

export const Email = ({ nextStep, previousStep }) => {
    const [{ theme }] = useTheme();
    const [{ new_user }, authDispatch] = useAuthentication();
    const [email, setEmail] = useState(new_user.email || '');

    return (
        <form
            onSubmit={() => {
                authDispatch({
                    type: 'SET_NEW_USER',
                    payload: { ...new_user, email },
                });
                nextStep();
            }}
        >
            <Flex direction='column'>
                <Input
                    autoFocus
                    value={email}
                    onChange={(event) => setEmail(() => event.target.value)}
                    type='email'
                    placeholder='johndoe@gmail.com'
                />

                <Flex margin='2rem 0 0 0'>
                    <Button variant='secondary' type='button' onClick={previousStep}>
                        <Text weight='600' margin='0 1rem 0 0'>
                            Go back
                        </Text>
                    </Button>
                    <Button type='submit' disabled={!!!email}>
                        <Flex>
                            <Text
                                weight='600'
                                margin='0 1rem 0 0'
                                color={theme.colors.constants.lightText}
                            >
                                Set Password
                            </Text>
                            <ArrowRight size={30} />
                        </Flex>
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};
