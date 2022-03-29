import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../../DataLayer';
import { useHistory } from 'react-router-dom';
import CloseIcon from '../../React icons/CloseIcon';

// Styled components
import StyledChatInfo from './StyledChatInfo';

// Images
import WhatsAppDefault from '../../React icons/whatsapp_default.svg';
import EditIcon from '../../React icons/EditIcon';
import ChatInfoContentGroup from '../ChatInfoContentGroup/ChatInfoContentGroup';
import { db } from '../../firebase';

const ChatInfo = (props) => {
    const history = useHistory();
    const [{ user, chatInfo, chatDetails, chatInfoMember }, dispatch] = useDataLayerValue();
    const [isBlocked, setIsBlocked] = useState(false);

    const chatInfoDetails =
        chatDetails?.members?.length <= 2
            ? [
                  { title: '', content: `${chatInfoMember?.name}` },
                  { title: 'About', content: `${chatInfoMember?.bio}` },
                  { title: 'Email', content: `${chatInfoMember?.email}` },
              ]
            : [
                  { title: '', content: `${chatDetails?.name}` },
                  { title: 'Description', content: `${chatDetails?.description}` },
                  {
                      title: `${chatDetails?.members?.length} Participants`,
                      content: chatDetails?.members,
                  },
              ];

    useEffect(() => {
        console.log('cahtinfo memebrid: ', chatInfoMember?.memberId);
        if (user?.blocked_contacts?.includes(chatInfoMember?.memberId)) setIsBlocked(true);
        else setIsBlocked(false);
    }, [chatInfoMember]);

    // ! Write logic to avoid blocking the same person again and again
    const blockContact = () => {
        // ! Update logic to actually remove the property without mutating the Object

        db.collection('members')
            .doc(`${user?.userId}`)
            .set(
                {
                    blocked_contacts: [...user?.blocked_contacts, chatInfoMember?.memberId],
                },
                { merge: true }
            );
    };

    const unblockContact = () => {
        db.collection('members')
            .doc(`${user?.userId}`)
            .set(
                {
                    blocked_contacts: [
                        ...user?.blocked_contacts.filter(
                            (member) => member !== chatInfoMember?.memberId
                        ),
                    ],
                },
                { merge: true }
            );
    };

    const exitGroup = () => {};

    return (
        <StyledChatInfo chatInfo={chatInfo}>
            <div className='chat_info_header'>
                <CloseIcon
                    onClick={() => dispatch({ type: 'SET_CHAT_INFO', chatInfo: !chatInfo })}
                />
                <h2>{chatDetails?.members?.length <= 2 ? 'Chat info' : 'Group info'}</h2>
            </div>
            <div className='chat_info_body'>
                <img src={chatDetails?.photoURL || WhatsAppDefault} alt={chatDetails?.name} />
                {chatInfoDetails.map(({ title, content }) => (
                    <ChatInfoContentGroup title={title} content={content} />
                ))}
                {chatDetails?.members?.length <= 2 ? (
                    user?.userId !== chatInfoMember?.memberId && (
                        <ChatInfoContentGroup
                            content={isBlocked ? 'Unblock' : 'Block'}
                            color='239, 105, 122'
                            onClick={() => {
                                isBlocked ? unblockContact() : blockContact();
                                setIsBlocked(!isBlocked);
                            }}
                        />
                    )
                ) : (
                    // ! Write more logic for this
                    <ChatInfoContentGroup
                        content='Exit Group'
                        color='239, 105, 122'
                        onClick={exitGroup}
                    />
                )}
            </div>
        </StyledChatInfo>
    );
};

export default ChatInfo;
