import React, { useRef, useState } from 'react';
import { useTheme } from '../../../context';

// components
import { OptionChecked, OptionUnchecked } from '../../../react_icons';

// styles
import { Flex, Text } from '../../../styled_components';
import { OptionLabel } from './option.styledcomponent';

export const Option = ({ children, onClick }) => {
    const inputRef = useRef();
    const [{ theme }] = useTheme();
    const [checked, setChecked] = useState(false);

    console.log('Check status => ', checked);

    return (
        <OptionLabel checked={checked} onClick={onClick}>
            {children}
            <input
                ref={inputRef}
                type='checkbox'
                checked={checked}
                onChange={() => setChecked((prevState) => !prevState)}
            />
            {checked ? (
                <OptionChecked
                    color={theme?.colors?.constants?.primary?.medium}
                    // onClick={() => console.log('Option Checked icon is clicked')}
                />
            ) : (
                <OptionUnchecked
                    color={theme?.colors?.lightBackground}
                    // onClick={() => inputRef.current.focus()}
                />
            )}
        </OptionLabel>
    );
};
