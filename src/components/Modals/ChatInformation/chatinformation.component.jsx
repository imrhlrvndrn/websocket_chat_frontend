import { useEffect } from 'react';
import { useSteps } from '../../../hooks';
import { useChat, useTheme } from '../../../context';

// import { setCreateRoom } from '../../../features/rooms.slice';

// styles
import { ChatInformationModal } from './chatinformation.styledcomponent';
import { Container, Flex, Text } from '../../../styledcomponents';

// components
import { Avatar } from '../..';

export const ChatInformation = () => {
    const [{ theme }] = useTheme();
    const [{ open_chat }, chatDispatch] = useChat();
    // const [_, Step, { nextStep, previousStep }] = useSteps([NewRoom, SetPassword]);

    // useEffect(() => {
    //     return () =>
    //         dispatch(
    //             setCreateRoom({
    //                 create_room: {
    //                     type: 'Public',
    //                     topic: '',
    //                     password: { value: '', isValid: false },
    //                 },
    //             })
    //         );
    // }, []);

    return (
        <ChatInformationModal>
            <Flex padding='2rem'>
                <Avatar
                    margin='0 2rem 0 0'
                    width='100px'
                    height='100px'
                    imgUrl='https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80'
                />
                <Flex direction='column' style={{ flex: 1 }}>
                    <Text weight='medium' size='heading4/large'>
                        CyberSecurity | CEH | CompTia+
                    </Text>
                    <Text opacity='0.6' size='body/small' color='secondary'>
                        2 members
                    </Text>
                </Flex>
            </Flex>
            <Container
                width='100%'
                padding=' 1rem 2rem 1rem 2rem'
                margin='0'
                style={{ background: theme?.colors?.mediumBackground }}
            >
                <Flex margin='0 0 1rem 0'>
                    <Text align='center'>Members</Text>
                    <Text align='center'>Admins</Text>
                    <Text align='center'>Settings</Text>
                </Flex>
                <Flex padding='0.5rem 0'>
                    <Avatar
                        margin='0 1rem 0 0'
                        width='60px'
                        height='60px'
                        imgUrl='https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80'
                    />
                    <Text>Rahul Ravindran</Text>
                </Flex>
                <Flex padding='0.5rem 0'>
                    <Avatar
                        margin='0 1rem 0 0'
                        width='60px'
                        height='60px'
                        imgUrl='https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80'
                    />
                    <Text>Srishti Sinha</Text>
                </Flex>
            </Container>
            {/* <Step nextStep={nextStep} previousStep={previousStep} /> */}
        </ChatInformationModal>
    );
};
