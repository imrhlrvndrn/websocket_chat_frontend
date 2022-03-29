import styled, { css } from 'styled-components';
import { extractFontSize } from '../../../utils';

export const StyledButton = styled.button`
    border-radius: 30px;
    transition: 0.3s all ease-in-out;
    height: ${(props) => props.height || 'max-content'};
    width: ${(props) => props.width || 'max-content'};
    margin: ${(props) => props.margin || '0'};
    padding: ${(props) => props.padding || '1rem 2rem'};
    color: ${(props) => props.theme.colors.constants.lightText};
    cursor: pointer;
    display: flex;
    align-items: center;
    jusify-content: center;
    font-size: ${(props) =>
        extractFontSize(props.theme.fonts.size[props.size || 'body/large'], props.theme)};
    background-color: ${(props) => props.theme.colors.constants.primary.medium};

    &:disabled {
        cursor: not-allowed;
    }

    &:hover {
        background-color: ${(props) => props.theme.colors.constants.primary.dark};
    }

    ${(props) =>
        props.variant === 'secondary' &&
        css`
            border-radius: 0;
            background-color: transparent;
            color: ${(props) => props.theme.colors.text};

            &:hover {
                background-color: transparent;
            }
        `}
`;
