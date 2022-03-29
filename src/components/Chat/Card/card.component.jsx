import React from 'react';

// components
import { Avatar } from '../../';
import { Flex, Text } from '../../../styledcomponents';

// Styled components
import StyledSidebarChat from './card.styledcomponent';

export const ChatCard = ({
    avatar = 'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    title = 'Rahul Ravindran',
    message = "I'm looking for a job",
    onClick = () => {},
}) => {
    return (
        <StyledSidebarChat onClick={() => onClick()}>
            <Avatar margin='0 1rem 0 0' imgUrl={avatar} />
            <Flex direction='column' style={{ flex: 1 }}>
                <Text as='h2' weight='bold'>
                    {title}
                </Text>
                <Text opacity='0.6' title={message} size='caption/large'>
                    {message}
                </Text>
            </Flex>
        </StyledSidebarChat>
    );
};
