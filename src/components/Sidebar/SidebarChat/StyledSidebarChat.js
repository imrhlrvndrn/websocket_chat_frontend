import styled from 'styled-components';

export default styled.div`
    a {
        padding: 1rem;
        display: flex;
        transition: 0.4s linear;
        cursor: pointer;

        &:hover {
            background-color: rgb(${(props) => props.theme.lightBackground});
        }

        &.active {
            background-color: rgb(${(props) => props.theme.mediumBackground});
        }

        img {
            margin-right: 1rem;
        }

        .sidebarChat__info {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .lastText {
                font-size: 0.8rem;
            }
        }
    }
`;
