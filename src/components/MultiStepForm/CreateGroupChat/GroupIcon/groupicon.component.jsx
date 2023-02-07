import React, { Fragment, useRef, useState } from 'react';
import { createChat } from '../../../../http';
import { useChat, useTheme } from '../../../../context';

// styles
import { Container, Text, Flex } from '../../../../styled_components';

// components
// import { ArrowRight, EditIcon } from '../../../../react_icons';
import { Button, Loader, Modal } from '../../../';
import { EditIcon, ArrowRight } from '../../../../react_icons';

export const GroupIcon = ({ nextStep, previousStep }) => {
    const [{ theme }] = useTheme();
    const fileInputRef = useRef(null);
    const [isActivationInProgress, setIsActivationInProgress] = useState(false);
    const [{ new_chat, user_chats }, chatDispatch] = useChat();
    const { name, avatar, users, group_admins, latest_message, is_group_chat } = new_chat;
    const [image, setImage] = useState(avatar?.display_image || '/images/avatars/young_boy.jpg');

    const captureImage = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        console.log('File to be captured => ', file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            console.log('Selected file =>', file);
            setImage(reader.result);
            /* Setting the avatar as reader?.result is causing issues when the avatar 
            is sent to the backend */
            chatDispatch({
                type: 'SET_NEW_CHAT',
                payload: { ...new_chat, avatar: { display_image: reader?.result, raw: file } },
            });
        };
    };

    const saveAndCreateNewChat = async (event) => {
        event.preventDefault();
        if (!avatar) return;

        const formData = new FormData();
        FormData.prototype.appendAnArrayOfData = function (name, arrayData) {
            arrayData.map((value) => this.append(name, value));
        };
        formData.append('name', name);
        formData.append('users', JSON.stringify(users));
        formData.append('uploadedFile', avatar?.raw);
        formData.append('group_admins', group_admins);
        formData.append('is_group_chat', is_group_chat);
        formData.append('latest_message', latest_message);
        formData.append('action_type', 'CREATE_GROUP_CHAT');

        try {
            setIsActivationInProgress(() => true);
            const {
                data: { success, data, toast },
            } = await createChat(formData);

            if (success) {
                chatDispatch({ type: 'SET_USER_CHATS', payload: [...user_chats, data?.chat] });
            }
            nextStep(event, '/', {
                title: { content: 'Group creation was successful!!', visible: true },
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsActivationInProgress(() => false);
        }
    };

    if (isActivationInProgress)
        return (
            <Modal title={{ visible: false }}>
                <Flex>
                    <Loader message={`Creating your group. Please wait...`} />
                </Flex>
            </Modal>
        );

    return (
        <Modal title={{ content: 'Choose a group avatar' }}>
            <Flex width='100%'>
                <Container
                    style={{ position: 'relative' }}
                    width='150px'
                    height='150px'
                    border='5px'
                    borderRadius='50%'
                    onClick={() => fileInputRef.current.click()}
                >
                    <input
                        onChange={captureImage}
                        style={{ display: 'none' }}
                        type='file'
                        ref={fileInputRef}
                    />
                    <img
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%',
                        }}
                        src={image}
                        alt=''
                    />
                    <Flex
                        padding='1rem'
                        style={{
                            cursor: 'pointer',
                            borderRadius: '50%',
                            background: `${theme.colors.darkBackground}`,
                            width: 'max-content',
                            height: 'max-content',
                            position: 'absolute',
                            bottom: '0',
                            right: '0%',
                            transform: 'translateX(50%)',
                        }}
                    >
                        {/* Add this Icon */}
                        <EditIcon color={theme?.colors?.text} size={20} />
                    </Flex>
                </Container>
            </Flex>
            <form onSubmit={saveAndCreateNewChat}>
                <Flex margin='4rem 0 0 0'>
                    <Button type='button' variant='secondary' onClick={previousStep}>
                        <Flex>
                            <Text weight='600' margin='0 1rem 0 0'>
                                Edit username
                            </Text>
                        </Flex>
                    </Button>
                    <Button type='submit' disabled={!!!image}>
                        <Flex>
                            <Text
                                weight='600'
                                margin='0 1rem 0 0'
                                color={theme.colors.constants.lightText}
                            >
                                Finish registration
                            </Text>
                            {/* Add this icon */}
                            <ArrowRight size={30} />
                        </Flex>
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
};
