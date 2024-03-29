import React from 'react';

// styles
import { Flex, Text } from '../../../styled_components';
import { Loader } from './loader.styledcomponent';

// components
import { LoaderIcon } from '../../../react_icons';

export const LoaderComponent = ({ message }) => {
    return (
        <Loader>
            <Flex direction='column'>
                <LoaderIcon />
                <Text margin='1rem 0 0 0'>{message}</Text>
            </Flex>
        </Loader>
    );
};
