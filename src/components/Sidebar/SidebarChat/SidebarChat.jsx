import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase';
import Avatar from '../../Avatar/Avatar';

// Styled components
import StyledSidebarChat from './StyledSidebarChat';

const SidebarChat = ({ id, name, imgUrl }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (id) {
            db.collection('chats')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
        }
    }, [id]);

    return (
        <StyledSidebarChat>
            <Link to={`/chats/${id}`}>
                <Avatar imgUrl={imgUrl} />
                <div className='sidebarChat__info'>
                    <h2>{name ? name : 'Room name'}</h2>
                    {messages?.length > 1 && (
                        <p className='lastText'>{`${messages[0]?.message.slice(0, 25)}...`}</p>
                    )}
                </div>
            </Link>
        </StyledSidebarChat>
    );
};

export default SidebarChat;
