import styled from 'styled-components';

export const StyledChatWindow = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;

    .mainChat__header {
    }
`;

export const ChatWindowHeader = styled.div`
    padding: 1rem;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.colors.darkBackground};
    border-left: 1px solid ${(props) => props.theme.colors.lightBackground};

    svg {
        cursor: pointer;
        margin-left: 2rem;
        fill: ${(props) => props.theme.colors.icon};
    }
`;

export const ChatWindowBody = styled.div`
    width: 100%;
    padding: 0 1rem;
    /* background: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'); */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: ${(props) => props.theme.colors.mediumBackground};
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

export const ChatWindowMessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem 1rem;
    border-left: 2px solid ${(props) => props.theme.colors.mediumBackground};
    background-color: ${(props) => props.theme.colors.darkBackground};

    svg {
        cursor: pointer;
        fill: ${(props) => props.theme.colors.icon};
    }
`;

export const ChatMessageInputForm = styled.form`
    flex: 1;
    border-radius: 30px;
    margin: 0 1rem;
    /* padding: 0 0 0 1rem; */
    background-color: ${(props) => props.theme.colors.mediumBackground};
    display: flex;
    align-items: center;

    input {
        background: transparent;
        flex: 1;
    }

    button {
        &:focus {
            background: ${(props) => props.theme.colors.constants.primary.dark};
        }
    }
`;
