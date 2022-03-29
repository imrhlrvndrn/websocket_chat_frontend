import styled from 'styled-components';

export const ChatInformationModal = styled.div`
    width: 35%;
    z-index: 1;
    /* padding: 2rem; */
    margin: 0 auto;
    border-radius: 10px;
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.darkBackground};
`;

export const RoomType = styled.div`
    width: 49%;
    outline: none;
    padding: 2rem;
    display: flex;
    cursor: pointer;
    align-items: center;
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    background-color: transparent;
    border: 2px solid transparent;
    transition: all 0.4s ease-in-out;

    &:hover,
    &:focus {
        border: 2px solid ${({ theme: { colors } }) => colors.lightBackground};
        background-color: ${({ theme: { colors } }) => colors.mediumBackground};
    }

    &.active {
        background-color: ${({ theme: { colors } }) => colors.constants.primary.medium};
        border: 2px solid transparent;
    }
`;
