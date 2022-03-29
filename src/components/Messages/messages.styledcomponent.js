import styled from 'styled-components';

export default styled.div`
    margin-bottom: 0.3rem;
<<<<<<< HEAD:client/src/components/MainChat/Messages/StyledMessages.js
    padding: 0.5rem 1rem;
    background-color: rgb(${(props) => props.theme.lightestBackground});
=======
    padding: 1rem;
    background-color: ${(props) => props.theme.colors.lightestBackground};
>>>>>>> d2dc5469003d066c59c60d20edd316092111578d:client/src/components/Messages/messages.styledcomponent.js
    width: max-content;
    max-width: 50%;
    border-radius: 10px;

    &.chat__receiver {
        margin: 0 0 0.3rem auto;
        background-color: ${(props) => props.theme.colors.constants.primary.light};

        &:first-of-type {
            margin: 1rem 0 0.3rem auto;
        }
    }

    &:first-child {
        margin-top: 0.3rem;
    }

    .userName {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        text-transform: capitalize;
        color: ${(props) => props.theme.colors.constants.primary.medium};
    }

    .message {
        margin-bottom: 0.5rem;
        color: rgb(${(props) => props.theme.constants.darkText});
    }

    .timestamp {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        p {
            font-size: 0.8rem;
            opacity: ${(props) => (props.read ? '.8' : '.2')};
            fill: ${(props) => (props.read ? 'blue' : 'black')};
            color: rgb(${(props) => props.theme.constants.darkText});
        }

        svg {
            opacity: 0.2;
            margin-left: 1rem;
        }
    }
`;
