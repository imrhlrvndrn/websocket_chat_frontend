import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

// styled components
import { Flex } from '../../../../styledcomponents';

// components
import { Modal, Button, Input } from '../../..';
import success_animation from '../../../../utils/animations/success.json';

export const SuccessStep = ({ title = { content: 'Operation successful!', visible: true } }) => {
    const animationRef = useRef();

    useEffect(() => {
        console.log('creating animation instance...');

        const animationInstance = lottie.loadAnimation({
            loop: true,
            autoplay: true,
            renderer: 'svg',
            container: animationRef?.current,
            path: 'https://assets5.lottiefiles.com/packages/lf20_wkebwzpz.json',
        });

        console.log('animation instance => ', animationInstance);
        animationInstance.play();
        animationInstance.setSpeed(1);

        () => animationInstance.destroy();
    }, []);

    return (
        <Modal title={{ content: title?.content, visible: title?.visible }}>
            {/* <form
                onSubmit={(event) => {
                    event.preventDefault();
                    nextStep();
                }}
            >
                <Button type='submit'>Close</Button>
            </form> */}
            <Flex height='300px' margin='0 auto' ref={animationRef}></Flex>
        </Modal>
    );
};
