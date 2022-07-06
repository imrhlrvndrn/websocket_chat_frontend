import styled from 'styled-components';

export const Container = styled.div`
    width: ${(props) => props.width || '80%'};
    height: ${(props) => props.height || 'max-content'};
    margin: ${(props) => props.margin || '0 auto'};
    padding: ${(props) => props.padding || '0'};
    border: ${(props) =>
        props.border &&
        `${props.border || '0px'} solid ${props.theme.colors.lightBackground}`};
    border-radius: ${(props) => props.borderRadius || '0'};
`;
