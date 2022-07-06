import styled from 'styled-components';

export const StyledChatInfo = styled.div`
    width: 25%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    overflow-y: auto;
    overflow-x: visible;
    box-shadow: -5px 0 10px 0 rgba(0, 0, 0, 0.4);
    background-color: ${(props) => props?.theme?.colors?.mediumBackground};

    /* Width */
    ::-webkit-scrollbar {
        width: 7px;
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

export const ChatInfoHeader = styled.div`
    top: 0px;
    position: sticky;
    display: flex;
    height: 80px;
    align-items: center;
    padding: 0 1rem;
    // border-left: 1px solid ${(props) => props?.theme?.colors?.lightBackground};
    background-color: ${(props) => props?.theme?.colors?.darkBackground};

    svg {
        cursor: pointer;
        fill: rgb(${(props) => props.theme.icon});
        margin-right: 1rem;
    }
`;

export const ChatInfoBody = styled.div`
    padding: 0rem;
    min-height: calc(100% - 80px);
    background-color: ${(props) => props?.theme?.colors?.mediumBackground};

    img.chatAvatar {
        display: block;
        margin: 1rem auto;
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
`;

export const ChatParticipantsContainer = styled.div`
    padding: 2rem 1rem 1rem 1rem;
`;
