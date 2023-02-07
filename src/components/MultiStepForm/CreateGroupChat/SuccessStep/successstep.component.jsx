import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import { useModalManager } from '../../../../context';

// styled components
import { Flex } from '../../../../styled_components';

// components
import { Modal } from '../../..';

export const SuccessStep = ({ title = { content: 'Operation successful!', visible: true } }) => {
    const animationRef = useRef();
    const { hideModal } = useModalManager();

    useEffect(() => {
        const animationInstance = lottie.loadAnimation({
            loop: true,
            autoplay: true,
            renderer: 'svg',
            container: animationRef?.current,
            path: 'https://assets5.lottiefiles.com/packages/lf20_wkebwzpz.json',
        });

        animationInstance.play();
        animationInstance.setSpeed(1);

        setTimeout(() => {
            hideModal();
        }, 3000);

        return () => animationInstance.destroy();
    }, []);

    return (
        <Modal title={{ content: title?.content, visible: title?.visible }}>
            <Flex height='300px' margin='0 auto' ref={animationRef}></Flex>
        </Modal>
    );
};
