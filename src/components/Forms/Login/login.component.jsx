// components
import { loginUser } from '../../../http';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../../context';

// styles
import { Flex, Text } from '../../../styledcomponents';

// components
import { ArrowRight } from '../../../react_icons';
import { Button, Card, CardContent, CardHeader, Input, PasswordField, Tabs } from '../..';

export const Login = ({ tabs, switchTab }) => {
    const [_, authDispatch] = useAuthentication();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const initiateLogin = async (event) => {
        event.preventDefault();
        try {
            // 1. Send Email & Password to server
            const {
                data: { success, data, toast },
            } = await loginUser({ email, password });
            // 2. If success, Log in the user
            if (success) {
                authDispatch({ type: 'SET_USER', payload: { user: data.user } });
                navigate('/', { replace: true });
            }
        } catch (error) {
            console.error('Error from server =>', error.response.data.message);
            alert(`Could not login user: Invalid Credentials ${error.response.data.message}`);
        }
    };

    return (
        <Fragment>
            <Card>
                <Tabs
                    tabs={tabs}
                    switchTab={(tabIndex) =>
                        switchTab(tabIndex, {
                            path: '/authenticate',
                            search: {
                                tab_state: tabs[tabIndex].name.toLowerCase(),
                            },
                            replace: false,
                        })
                    }
                />
                <CardHeader text={`Please enter your credentials`} />
                <CardContent>
                    <form onSubmit={(event) => initiateLogin(event)}>
                        <label>
                            <Text>Email</Text>
                        </label>
                        <Input
                            margin='0.2rem 0 1rem 0'
                            value={email}
                            onChange={(event) => setEmail(() => event.target.value)}
                            type='email'
                            placeholder='johndoe@gmail.com'
                        />
                        <label>
                            <Text>Password</Text>
                        </label>
                        <PasswordField
                            margin='0.2rem 0 1rem 0'
                            value={password}
                            onChange={(event) => setPassword(() => event.target.value)}
                            placeholder='Enter your password'
                        />
                        <Flex>
                            <Button variant='secondary' type='button' onClick={() => navigate(-1)}>
                                Login as Guest
                            </Button>
                            <Button
                                disabled={email.length > 0 && password.length > 0 ? false : true}
                                type='submit'
                            >
                                <Text weight='medium'>Login</Text>
                                <ArrowRight size={30} />
                            </Button>
                        </Flex>
                    </form>
                </CardContent>
            </Card>
        </Fragment>
    );
};
