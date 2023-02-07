import { createContext, useContext, useEffect, useState } from 'react';

// components
import {
    CreateGroupChat,
    CreateGroupInvite,
    AddParticipant,
    ChatInformation,
} from '../../components';

const MODAL_TYPES = {
    ADD_PARTICIPANT: AddParticipant,
    CHAT_INFORMATION: ChatInformation,
    CREATE_GROUP_INVITE: CreateGroupInvite,
    CREATE_NEW_GROUP_MODAL: CreateGroupChat,
    DELETE_MODAL: '',
    UPDATE_MODAL: '',
};

const initialState = {
    showModal: (type, props) => {},
    hideModal: () => {},
    modal: {},
};

const ModalContext = createContext(initialState);

export const useModalManager = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState({ type: '', props: {} });
    const { type, props } = modal;

    const showModal = (type, props = {}) => {
        setModal({
            ...modal,
            type,
            props,
        });
    };

    const hideModal = () => {
        setModal({
            ...modal,
            type: '',
            props: {},
        });
    };

    const renderModal = () => {
        const ModalComponent = MODAL_TYPES[type];
        if (!type || !ModalComponent) {
            return null;
        }
        return <ModalComponent id='global-modal' {...props} />;
    };

    useEffect(() => {
        window.addEventListener('keydown', (event) => event?.key === 'Escape' && hideModal());
        return () =>
            window.removeEventListener(
                'keydown',
                (event) => event?.key === 'Escape' && hideModal()
            );
    }, []);

    return (
        <ModalContext.Provider value={{ showModal, hideModal, modal }}>
            {renderModal()}
            {children}
        </ModalContext.Provider>
    );
};
