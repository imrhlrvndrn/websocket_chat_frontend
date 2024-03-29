import React, { useState } from 'react';
import { useAuthentication } from '../../../context';

// styles
import { Flex, Text } from '../../../styled_components';

// components
import { ArrowRight } from '../../../react_icons';
import { Button, PasswordField, PasswordStrengthBar } from '../..';

export const Password = ({ nextStep, previousStep }) => {
    const [{ new_user }, authDispatch] = useAuthentication();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const passwordMatch =
        confirmPassword !== '' && password !== '' && confirmPassword === password ? true : false;
    const disableNextStep =
        password && passwordMatch && new_user.password.strength === 4 ? false : true;

    console.log('password properties => ', {
        passwordMatch,
        disableNextStep,
        passwordStrength: new_user?.password,
    });

    return (
        <form
            onSubmit={() => {
                authDispatch({
                    type: 'SET_NEW_USER',
                    payload: { ...new_user, password: { ...new_user?.password, value: password } },
                });
                nextStep();
            }}
        >
            <PasswordField
                autoFocus
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder='Enter your password'
            />
            <PasswordStrengthBar password={password} callback={() => {}} />
            <PasswordField
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder='Re-enter your password'
            />
            {passwordMatch && <Text color='lightgreen'>Passwords match</Text>}
            <Flex>
                <Button variant='secondary' type='button' onClick={previousStep}>
                    Go back
                </Button>
                <Button type='submit' disabled={disableNextStep}>
                    <Text size='heading6/large' weight='medium'>
                        Set name
                    </Text>
                    <ArrowRight size={30} />
                </Button>
            </Flex>
        </form>
    );
};
