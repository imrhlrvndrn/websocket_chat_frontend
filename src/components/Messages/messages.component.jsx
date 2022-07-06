import React, { useState, useEffect } from 'react';
// import moment from 'moment';

// React icons
import { ReadIcon } from '../../react_icons';

// Styled components
import StyledMessages from './messages.styledcomponent';

export const Messages = ({ message }) => {
    const [read, setRead] = useState(false);

    useEffect(() => {
        setRead(true);
    }, []);

    return <div>message sent/received by user</div>;
    // return (
    //     <> 
    //         <StyledMessages
    //             read={read}
    //             className={`${message?.data?.userId === user?.userId &&
    //                 'chat__receiver'} messageContainer`}
    //         >
    //             <p className='userName'>{message?.data?.name}</p>
    //             <p className='message'>{message?.data?.message}</p>
    //             <div className='timestamp'>
    //                 <p>{moment(new Date(message?.data?.timestamp?.toDate())).format('hh:mm A')}</p>
    //                 {message?.userId === user?.userId && (
    //                     <ReadIcon fill='black' width='20px' height='20px' />
    //                 )}
    //             </div>
    //             <ContextMenu menu={['Delete', 'Reply', 'Edit']} />
    //         </StyledMessages>
    //     </>
    // );
};
