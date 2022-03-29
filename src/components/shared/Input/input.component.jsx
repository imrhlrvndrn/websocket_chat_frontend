import { useState } from 'react';

// styles
import { Flex, Text } from '../../../styledcomponents';
import { InputField, InputContainer, PasswordFieldToggle } from './input.styledcomponent';

// components
import { Button } from '../Button/button.component';
import { HideIcon, ShowIcon } from '../../../react_icons';

export const Input = (props) => {
    return (
        <InputContainer>
            <InputField {...props} />
        </InputContainer>
    );
};

export const PasswordField = ({ margin, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Flex margin={margin || '1rem 0'}>
            <InputField {...props} type={showPassword ? 'text' : 'password'} />
            <PasswordFieldToggle
                tabIndex='0'
                onKeyPress={() => setShowPassword((prevState) => !prevState)}
                onClick={() => setShowPassword((prevState) => !prevState)}
            >
                <Text>{!showPassword ? <HideIcon /> : <ShowIcon />}</Text>
            </PasswordFieldToggle>
        </Flex>
    );
};
