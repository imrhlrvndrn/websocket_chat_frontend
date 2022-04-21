import React, { useState } from 'react';

// styles
import { Flex, Text } from '../../../styledcomponents';
import { OptionLabel } from './option.styledcomponent';

export const Option = ({ children }) => {
    const [checked, setChecked] = useState(false);

    return (
        <OptionLabel checked={checked}>
            {children}
            <input
                type='checkbox'
                name=''
                id=''
                checked={checked}
                onChange={() => setChecked((prevState) => !prevState)}
            />
        </OptionLabel>
    );
};
