import React from 'react';
import { useModalManager, useTheme } from '../../../context';

// styles
import { Flex } from '../../../styledcomponents';
import { ModalContainer } from './modal.styledcomponent';

// components
import { Card, CardContent, CardHeader } from '../..';

export const Modal = ({
    // variant,
    children,
    title,
    ...props
}) => {
    const [{ theme }] = useTheme();
    const { hideModal } = useModalManager();

    const { visible = true, content = 'Modal Header' } = title;

    console.log('Modal props => ', { title, props });

    return (
        <ModalContainer>
            <Flex height='100%'>
                <Card style={{ zIndex: '1', backgroundColor: theme?.colors?.darkBackground }}>
                    {visible && <CardHeader text={content} />}
                    <CardContent>{children}</CardContent>
                </Card>
            </Flex>
            <div className='overlay' onClick={hideModal}></div>
        </ModalContainer>
    );
};
