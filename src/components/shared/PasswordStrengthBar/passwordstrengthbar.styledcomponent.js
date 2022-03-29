import styled from 'styled-components';

export const StrengthBar = styled.div`
    margin: 0.5rem 0;
    height: 4px;
    width: 24.5%;
    background-color: ${(props) =>
        props.color || props.theme.colors.lightBackground};
    border-radius: 2px;
`;
