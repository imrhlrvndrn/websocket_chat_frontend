import styled from 'styled-components';

export const Flex = styled.div`
    position: relative;
    display: flex;
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || 'auto'};
    margin: ${(props) => props.margin || '0'};
    padding: ${(props) => props.padding || '0'};
    flex-direction: ${(props) => props.direction || 'row'};
    align-items: ${(props) => props.align || 'center'};
    justify-content: ${(props) => props.justify || 'center'};
    flex-grow: ${(props) => props.grow || '0'};
    flex-shrink: ${(props) => props.shrink || '0'};
`;
