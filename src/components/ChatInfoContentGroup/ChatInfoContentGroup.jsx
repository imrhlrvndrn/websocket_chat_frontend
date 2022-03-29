import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../../DataLayer';
import { db } from '../../firebase';

// Styled components
import StyledChatInfoContentGroup from './StyledChatInfoContentGroup';

const ChatInfoContentGroup = ({ title, content, Icon, color, onClick }) => {
    const [{ chatDetails }, dispatch] = useDataLayerValue();
    const [chatParticipants, setChatParticipants] = useState([]);

    useEffect(() => {
        if (Array.isArray(content)) {
            db.collection('members')
                .where('userId', 'in', content)
                .get()
                .then((querySnapshot) => {
                    let constructResponse = [];
                    console.log('In the querySnapshot: ', querySnapshot?.docs);
                    constructResponse = querySnapshot?.docs?.map((doc) => {
                        console.log(`Snapshot of where clause: `, doc?.data());
                        return {
                            userId: doc?.data()?.userId,
                            name: doc?.data()?.name,
                            photoURL: doc?.data()?.photoURL,
                        };
                    });
                    setChatParticipants(constructResponse);
                });
        }
    }, [content]);

    return (
        <StyledChatInfoContentGroup color={color} onClick={onClick}>
            <div className='copy'>
                <h3>{title}</h3>
                {Array.isArray(content) ? (
                    chatParticipants.map((participant) => (
                        <div key={participant?.userId} className='copy_participants'>
                            <img src={participant?.photoURL} />
                            <p>{`${participant?.name}`}</p>
                        </div>
                    ))
                ) : (
                    <p>{content === 'undefined' ? '' : content}</p>
                )}
            </div>
            {Icon && <Icon />}
        </StyledChatInfoContentGroup>
    );
};

export default ChatInfoContentGroup;
