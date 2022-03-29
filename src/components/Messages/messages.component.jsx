import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDataLayerValue } from '../../../DataLayer';

// React icons
import { ReadIcon } from '../../react_icons';

// Styled components
<<<<<<< HEAD:client/src/components/MainChat/Messages/Messages.jsx
import StyledMessages from './StyledMessages';
import ContextMenu from '../../ContextMenu/ContextMenu';
=======
import StyledMessages from './messages.styledcomponent';
>>>>>>> d2dc5469003d066c59c60d20edd316092111578d:client/src/components/Messages/messages.component.jsx

export const Messages = ({ message }) => {
    const [read, setRead] = useState(false);
    const [{ user }, dispatch] = useDataLayerValue();

    useEffect(() => {
        setRead(true);
    }, []);

    return (
        <>
            <StyledMessages
                read={read}
                className={`${
                    message?.data?.userId === user?.userId && 'chat__receiver'
                } messageContainer`}
            >
                <p className='userName'>{message?.data?.name}</p>
                <p className='message'>{message?.data?.message}</p>
                <div className='timestamp'>
                    <p>{moment(new Date(message?.data?.timestamp?.toDate())).format('hh:mm A')}</p>
                    {message?.userId === user?.userId && (
                        <ReadIcon fill='black' width='20px' height='20px' />
                    )}
                </div>
                <ContextMenu menu={['Delete', 'Reply', 'Edit']} />
            </StyledMessages>
        </>
    );
};
