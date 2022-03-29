import { useEffect } from 'react';
import { useAuthentication } from '../../../context';
import { generateBars } from './passwordstrengthbar.utils';

// custom hooks
import { usePasswordStrength } from '../../../hooks';

// styles
import { Flex } from '../../../styledcomponents';
import { StrengthBar } from './passwordstrengthbar.styledcomponent';

export const PasswordStrengthBar = ({
    password = '',
    callback = () => {},
    options = { colors: ['red', 'yellow', 'orange', 'lightgreen'] },
}) => {
    const [{ new_user }, authDispatch] = useAuthentication();
    const { passwordStrength, color } = usePasswordStrength(password, {
        colors: options.colors,
    });

    useEffect(() => {
        if (passwordStrength === 4) {
            authDispatch({
                type: 'SET_NEW_USER',
                payload: { ...new_user, password: { value: password, strength: passwordStrength } },
            });
            callback();
        }
    }, [password]);

    return (
        <Flex justify='space-between'>
            {generateBars(4).map((value, index) => (
                <StrengthBar key={value} color={index + 1 <= passwordStrength ? color : ''} />
            ))}
        </Flex>
    );
};
