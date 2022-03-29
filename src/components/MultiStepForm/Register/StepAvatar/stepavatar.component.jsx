import { Fragment, useRef, useState } from 'react';
import { activateAccount } from '../../../../http';
import { useAuthentication, useTheme } from '../../../../context';

// styles
import { Container, Text, Flex } from '../../../../styledcomponents';

// components
// import { ArrowRight, EditIcon } from '../../../../react_icons';
import { Button, Card, CardContent, CardHeader, Loader } from '../../../';
import { EditIcon } from '../../../../react_icons';

export const StepAvatar = ({ nextStep, previousStep }) => {
    const [{ theme }] = useTheme();
    const fileInputRef = useRef(null);
    const [isActivationInProgress, setIsActivationInProgress] = useState(false);
    const [
        {
            new_user: { avatar, email, password, full_name },
        },
        authDispatch,
    ] = useAuthentication();
    const [image, setImage] = useState(avatar || '/images/avatars/young_boy.jpg');

    const captureImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            console.log('Selected file =>', file);
            setImage(reader.result);
            authDispatch({ type: 'SET_AVATAR', payload: file });
        };
    };

    const saveAndActivateAccount = async (event) => {
        event.preventDefault();
        if (!avatar) return;

        const formData = new FormData();
        formData.append('uploadedFile', avatar);
        formData.append('full_name', full_name);
        formData.append('email', email);
        formData.append('password', password);

        try {
            setIsActivationInProgress(() => true);
            const {
                data: { success, data, toast },
            } = await activateAccount(formData);

            if (success) {
                // ! Check if the data is properly structured
                authDispatch({ type: 'SET_USER', payload: data });
                nextStep();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsActivationInProgress(() => false);
        }
    };

    if (isActivationInProgress)
        return (
            <Card>
                <CardContent>
                    <Flex>
                        <Loader message={`Activation in progress. Please wait...`} />
                    </Flex>
                </CardContent>
            </Card>
        );

    return (
        <Fragment>
            <Card>
                <CardHeader text={`${full_name.split(' ')[0]}, choose your avatar`} />
                <CardContent>
                    <Flex width='100%'>
                        <Container
                            style={{ position: 'relative' }}
                            width='150px'
                            height='150px'
                            border='10px'
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
                                <EditIcon color={theme.colors.text} size={20} />
                            </Flex>
                        </Container>
                    </Flex>
                    <form onSubmit={saveAndActivateAccount}>
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
                                    {/* <ArrowRight size={30} /> */}
                                </Flex>
                            </Button>
                        </Flex>
                    </form>
                </CardContent>
            </Card>
        </Fragment>
    );
};
