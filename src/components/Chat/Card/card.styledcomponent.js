import styled from 'styled-components';

export default styled.div`
    padding: 1rem;
    display: flex;
    transition: 0.4s linear;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.lightBackground};
    }

    &.active {
        background-color: ${(props) => props.theme.colors.mediumBackground};
    }
`;
