import styled from 'styled-components';

export const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || '100%'};
    border-radius: ${(props) => props.borderRadius || '0'};
`;
