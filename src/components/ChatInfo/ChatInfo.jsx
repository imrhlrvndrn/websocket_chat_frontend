import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchChat } from '../../http';
import { CloseIcon } from '../../react_icons';

// Styled components
import { Flex, Text } from '../../styledcomponents';
import {
    StyledChatInfo,
    ChatInfoHeader,
    ChatInfoBody,
    ChatParticipantsContainer,
} from './StyledChatInfo';

// components
import { TextAvatar } from '../';

// Images

const ChatInfo = (props) => {
    const [chatDetails, setChatDetails] = useState({});
    const [isBlocked, setIsBlocked] = useState(false);
    const params = useParams();

    const fetchChatInfo = async () => {
        try {
            const {
                data: { data, success },
            } = await fetchChat(params?.chatId);
            console.log('Chat information=> ', { data });
            if (success) setChatDetails((prevState) => data?.chat);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        (async () => await fetchChatInfo())();
    }, []);

    // const chatInfoDetails =
    //     chatDetails?.members?.length <= 2
    //         ? [
    //               { title: '', content: `${chatInfoMember?.name}` },
    //               { title: 'About', content: `${chatInfoMember?.bio}` },
    //               { title: 'Email', content: `${chatInfoMember?.email}` },
    //           ]
    //         : [
    //               { title: '', content: `${chatDetails?.name}` },
    //               { title: 'Description', content: `${chatDetails?.description}` },
    //               {
    //                   title: `${chatDetails?.members?.length} Participants`,
    //                   content: chatDetails?.members,
    //               },
    //           ];

    // useEffect(() => {
    //     console.log('cahtinfo memebrid: ', chatInfoMember?.memberId);
    //     if (user?.blocked_contacts?.includes(chatInfoMember?.memberId)) setIsBlocked(true);
    //     else setIsBlocked(false);
    // }, [chatInfoMember]);

    // ! Write logic to avoid blocking the same person again and again
    const blockContact = () => {
        // ! Update logic to actually remove the property without mutating the Object
        // db.collection('members')
        //     .doc(`${user?.userId}`)
        //     .set(
        //         {
        //             blocked_contacts: [...user?.blocked_contacts, chatInfoMember?.memberId],
        //         },
        //         { merge: true }
        //     );
    };

    const unblockContact = () => {
        // db.collection('members')
        //     .doc(`${user?.userId}`)
        //     .set(
        //         {
        //             blocked_contacts: [
        //                 ...user?.blocked_contacts.filter(
        //                     (member) => member !== chatInfoMember?.memberId
        //                 ),
        //             ],
        //         },
        //         { merge: true }
        //     );
    };

    const exitGroup = () => {};

    return (
        <StyledChatInfo>
            <ChatInfoHeader>
                <CloseIcon
                    onClick={() => dispatch({ type: 'SET_CHAT_INFO', chatInfo: !chatInfo })}
                />
                <Text>
                    {/* {chatDetails?.members?.length <= 2 ? 'Chat info' : 'Group info'} */}
                    Chat Info
                </Text>
            </ChatInfoHeader>
            <ChatInfoBody>
                <img
                    src='https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80'
                    alt='user avatar'
                    className='chatAvatar'
                />
                <Text align='center' size='heading4/large'>
                    {chatDetails?.name}
                </Text>
                <Text align='center' size='body/small' opacity='0.6'>
                    {chatDetails?.users?.length} participants
                </Text>
                <ChatParticipantsContainer>
                    <Text margin='0 0 1rem 0'>{chatDetails?.users?.length} participants</Text>
                    {new Array(1, 2, 3, 4).map(() => (
                        <TextAvatar
                            img={{
                                url: 'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
                                alt: 'user avatar',
                                margin: '0 1rem 0 0',
                            }}
                            margin='0 0 1rem 0'
                        >
                            <Text>User's name</Text>
                        </TextAvatar>
                    ))}
                </ChatParticipantsContainer>
                {/* <img src={chatDetails?.photoURL || WhatsAppDefault} alt={chatDetails?.name} /> */}
                {/* {chatInfoDetails.map(({ title, content }) => (
                    <ChatInfoContentGroup title={title} content={content} />
                ))} */}
                {/* {chatDetails?.members?.length <= 2 ? (
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
                )} */}
            </ChatInfoBody>
        </StyledChatInfo>
    );
};

export default ChatInfo;
