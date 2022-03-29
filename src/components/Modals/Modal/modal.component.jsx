import { Flex } from '../../../styledcomponents';
import { ModalContainer } from './modal.styledcomponent';

export const Modal = ({ modal, toggleModal }) => {
    const Modal = modal;

    return (
        <ModalContainer>
            <Flex height='100%'>
                <Modal />
            </Flex>
            <div className='overlay' onClick={toggleModal}></div>
        </ModalContainer>
    );
};
