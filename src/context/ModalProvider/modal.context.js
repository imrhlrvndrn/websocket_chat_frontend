import { createContext, useContext } from 'react';

export const MODAL_TYPES = {
    CREATE_MODAL: '',
    DELETE_MODAL: '',
    UPDATE_MODAL: '',
};

const initialState = {
    showModal: () => {},
    hideModal: () => {},
    modal: {},
};

export const ModalContext = createContext(initialState);

export const useModalManager = useContext();

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState();
    const { type, props } = modal || {};

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
            type: null,
            props: {},
        });
    };

    const renderComponent = () => {
        const ModalComponent = MODAL_TYPES[type];
        if (!type || !ModalComponent) {
            return null;
        }
        return <ModalComponent id='global-modal' {...props} />;
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal, modal }}>
            {renderComponent()}
            {children}
        </ModalContext.Provider>
    );
};
