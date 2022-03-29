import styled from 'styled-components';

export const StyledLink = styled.a`
    margin: ${(props) => props.style.margin || '0'};
    padding: ${(props) => props.style.padding || '0'};
    width: ${(props) => props.style.width || 'max-content'};
    color: ${(props) => props.style.color || props.theme.colors.text};
    font-size: ${(props) => props.theme.fonts.size[props.style.size || 'md']};
    font-weight: ${(props) =>
        props.theme.fonts.weight[props.style.weight || '400']};
`;
