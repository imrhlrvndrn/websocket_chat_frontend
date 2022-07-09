import React, { useState, useEffect, Fragment } from 'react';
import { useAuthentication } from '../../context';
// import moment from 'moment';

// React icons
import { ReadIcon } from '../../react_icons';
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

    console.log('The message comp => ', message);

    // return (
    //     <div>
    //         <Text>message sent/received by the user {message}</Text>
    //     </div>
    // );
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
                {/* <p>{moment(new Date(message?.data?.timestamp?.toDate())).format('hh:mm A')}</p> */}
                {isSelfMessage() && <ReadIcon fill='black' width='20px' height='20px' />}
            </div>
            {/* <ContextMenu menu={['Delete', 'Reply', 'Edit']} /> */}
        </StyledMessages>
    );
};
