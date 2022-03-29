import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { db } from '../../firebase';
import { useDataLayerValue } from '../../DataLayer';

// Styled conponents
import StyledSidebar from './StyledSidebar';

// React icons
import StoriesIcon from '../../React icons/StoriesIcon';

// React components
import Avatar from '../Avatar/Avatar';
import MessageIcon from '../../React icons/MessageIcon';
import MoreOptionsIcon from '../../React icons/MoreOptionsIcon';
import SearchIcon from '../../React icons/SearchIcon';
import SidebarChat from './SidebarChat/SidebarChat';

const Sidebar = () => {
    const [{ user, chatRooms, chatInfo }, dispatch] = useDataLayerValue();

    useEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .where('members', 'array-contains', `${user?.userId}`)
            .onSnapshot((snapshot) => {
                snapshot.docs.map(async (doc) => {
                    let snapshotData;
                    // Check if the chat is a DM or a Group
                    if (doc?.data()?.members.length <= 2) {
                        const chatMember = doc?.data()?.members.filter((member) => {
                            if (doc?.data()?.members?.length === 1) {
                                if (doc?.data()?.members[0] !== user?.userId)
                                    return member !== user?.userId;
                                else return member === user?.userId;
                            } else return member !== user?.userId;
                        });

                        const fetchMember = async () => {
                            const fetchedMember = await db
                                .collection('members')
                                .doc(chatMember[0])
                                .get();

                            snapshotData = {
                                ...doc?.data(),
                                photoURL: fetchedMember.data()?.photoURL,
                                name: fetchedMember?.data()?.name,
                            };
                            console.log('Members data: ', fetchedMember?.data());
                            console.log('Constructed snapshot data: ', snapshotData);
                        };

                        await fetchMember();
                    } else {
                        snapshotData = doc?.data();
                    }

                    dispatch({
                        type: 'SET_CHAT_ROOMS',
                        chatRooms: [
                            ...chatRooms,
                            {
                                id: doc.id,
                                data: snapshotData,
                            },
                        ],
                    });
                });
            });

        return () => unsubscribe();
    }, []);

    const createNewChat = () => {
        const newChatName = prompt('Enter a name for the new chat');

        if (newChatName)
            db.collection('chats').add({
                name: newChatName,
                owner: user?.userId,
                members: [user?.userId],
                roles: { [`${user?.userId}`]: ['admin', 'owner', 'member'] },
                photoURL: '',
                description: '',
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
            });
    };

    return (
        <StyledSidebar chatInfo={chatInfo}>
            <div className='sidebar__header'>
                <Avatar width='45px' height='45px' imgUrl={user?.photoURL} />
                <div className='sidebar__header__icons'>
                    <StoriesIcon />
                    <MessageIcon />
                    <MoreOptionsIcon />
                </div>
            </div>
            <div className='sidebarSearchContainer'>
                <div className='sidebarSearchContainer__input'>
                    <SearchIcon />
                    <input
                        type='text'
                        name='searchBar'
                        id='searchBar'
                        placeholder='Search or start a new chat'
                    />
                </div>
            </div>
            <div className='sidebarChat'>
                <div className='addNewChat' onClick={createNewChat}>
                    Start new chat
                </div>
                <SidebarChat />
                {chatRooms?.map((room) => (
                    <SidebarChat
                        key={room?.id}
                        id={room?.id}
                        name={room?.data?.name}
                        imgUrl={room?.data?.photoURL}
                    />
                ))}
            </div>
        </StyledSidebar>
    );
};

export default Sidebar;
