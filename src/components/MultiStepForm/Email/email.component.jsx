import { useState } from 'react';
import { sendOtp } from '../../../http';
import { useTheme, useAuthentication } from '../../../context';

// styles
import { Flex, Text } from '../../../styledcomponents';

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
                // * 1. Send the email to the server
                // * 2. Send an OTP to the email
                authDispatch({
                    type: 'SET_NEW_USER',
                    payload: { ...new_user, email },
                });
                //      sendOtp(email);
                // * 3. Redirect to the next step
                console.log(`OTP sent to ${email}`);
                nextStep();
            }}
        >
            <Flex direction='column'>
                <Input
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
                                Send OTP
                            </Text>
                            <ArrowRight size={30} />
                        </Flex>
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};
