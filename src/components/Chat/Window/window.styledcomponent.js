import styled from 'styled-components';

export const StyledChatWindow = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 75%;
    max-height: 100vh;
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
    padding: 0 1rem;
    background-color: ${(props) => props.theme.colors.mediumBackground};
    overflow-y: auto;
    display: flex;
    flex-direction: column;
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
    // position: absolute;
    // bottom: 0;
    // left: 0;
    // width: 100%;
    display: flex;
    align-items: center;
    padding: 1rem 1rem;
    border-left: 2px solid ${(props) => props.theme.colors.mediumBackground};
    background-color: ${(props) => props.theme.colors.darkBackground};

    svg {
        cursor: pointer;
        fill: ${(props) => props.theme.colors.icon};
    }

    input {
        &:focus,
        &:hover {
            border: none;
        }
    }
`;

export const ChatMessageInputForm = styled.form`
    flex: 1;
    display: flex;
    align-items: center;
    border-radius: 30px;
    background-color: ${(props) => props.theme.colors.mediumBackground};

    input {
        background: transparent;
        flex: 1;
        outline: none;
        border: none;
    }

    button {
        &:focus {
            background: ${(props) => props.theme.colors.constants.primary.dark};
        }
    }
`;
