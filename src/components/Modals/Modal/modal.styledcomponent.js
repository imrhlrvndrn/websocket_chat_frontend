import styled from 'styled-components';

export const ModalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    .overlay {
        z-index: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        backdrop-filter: blur(5px);
        background-color: rgba(0, 0, 0, 0.8);
        transition: backdrop-filter 0.4s ease-in-out;

        /* &:hover {
            backdrop-filter: blur(0);
        } */
    }
`;
