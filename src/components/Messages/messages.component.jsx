import React, { useState, useEffect, Fragment } from 'react';
import { useAuthentication } from '../../context';
// import moment from 'moment';

// React icons
import { DeleteIcon, ReadIcon } from '../../react_icons';
import { Flex, Text } from '../../styled_components';

// Styled components
import StyledMessages from './messages.styledcomponent';

export const Messages = ({ message }) => {
    const [read, setRead] = useState(false);
    const [{ user }] = useAuthentication();

    useEffect(() => {
        setRead(true);
    }, []);

    const isSelfMessage = () => message?.sender?._id === user?._id;

    return (
        <StyledMessages selfMessage={isSelfMessage()} read={read} className={`messageContainer`}>
            <Flex justify='flex-start'>
                {!isSelfMessage() && (
                    <Fragment>
                        <Text
                            width='max-content'
                            size='caption/large'
                            margin='0 0.5rem 0.5rem 0'
                            style={{ textTransform: 'capitalize' }}
                        >
                            {message?.sender?.full_name}
                        </Text>
                        <Text
                            width='max-content'
                            size='caption/large'
                            margin='0 0 0.5rem 0'
                            opacity='0.6'
                        >
                            is edited
                        </Text>
                    </Fragment>
                )}
            </Flex>
            <p className='message'>{message?.content}</p>
            <div className='timestamp'>
                {isSelfMessage() && <DeleteIcon size={22} className='delete' color='whitesmoke' />}
                {/* {isSelfMessage() && <ReadIcon fill='black' width='20px' height='20px' />} */}
            </div>
        </StyledMessages>
    );
};
