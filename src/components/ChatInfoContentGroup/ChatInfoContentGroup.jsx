import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchChat } from '../../http';
// import { useDataLayerValue } from '../../DataLayer';
// import { db } from '../../firebase';

// Styled components
import StyledChatInfoContentGroup from './StyledChatInfoContentGroup';

const ChatInfoContentGroup = ({ title, content, Icon, color, onClick }) => {
    const params = useParams();
    // const [{ chatDetails }, dispatch] = useDataLayerValue();
    const [chatParticipants, setChatParticipants] = useState([]);

    console.log(params);

    useEffect(() => {
        const fetchChatInfo = async () => {
            try {
                const chat = await fetchChat(params?.chatId);
            } catch (error) {
                console.error(error);
            }
        };
        // if (Array.isArray(content)) {
        //     db.collection('members')
        //         .where('userId', 'in', content)
        //         .get()
        //         .then((querySnapshot) => {
        //             let constructResponse = [];
        //             console.log('In the querySnapshot: ', querySnapshot?.docs);
        //             constructResponse = querySnapshot?.docs?.map((doc) => {
        //                 console.log(`Snapshot of where clause: `, doc?.data());
        //                 return {
        //                     userId: doc?.data()?.userId,
        //                     name: doc?.data()?.name,
        //                     photoURL: doc?.data()?.photoURL,
        //                 };
        //             });
        //             setChatParticipants(constructResponse);
        //         });
        // }
    }, []);

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
