import styled from 'styled-components';

export default styled.div`
    margin-bottom: 0.5rem;
    margin-left: ${(props) => (props?.selfMessage ? 'auto' : '0')};
    padding: 1rem;
    background-color: ${(props) =>
        props?.selfMessage
            ? props?.theme?.colors?.constants?.primary?.medium
            : props?.theme?.colors?.lightBackground};
    width: max-content;
    min-width: 200px;
    max-width: 90%;
    word-wrap: wrap;
    border-radius: ${(props) => (props?.selfMessage ? '10px 10px 0 10px' : '10px 10px 10px 0')};

    &:first-child {
        margin-top: 0.5rem;
    }

    .message {
        margin-bottom: 0.5rem;
        color: ${(props) => props?.theme?.colors?.text};
    }

    .timestamp {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        p {
            font-size: 0.8rem;
            opacity: ${(props) => (props.read ? '1' : '1')};
            fill: ${(props) => (props.read ? 'blue' : 'black')};
            color: ${(props) => props?.theme?.colors?.text};
        }

        svg {
            opacity: 0.8;
            margin-left: 1rem;
        }
    }
`;
