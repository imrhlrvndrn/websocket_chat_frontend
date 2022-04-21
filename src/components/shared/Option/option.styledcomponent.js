import styled, { css } from 'styled-components';

export const OptionLabel = styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    width: 100%;
    border-radius: 10px;
    transition: all 0.4s;
    border: 2px solid transparent;

    ${(props) =>
        props.checked &&
        css`
            box-shadow: 0.2px 0.8px 5px 0
                    ${(props) => props?.theme?.colors?.constants?.primary?.medium},
                inset 0.2px 0.8px 5px 0
                    ${(props) => props?.theme?.colors?.constants?.primary?.medium};
            border: 2px solid ${(props) => props?.theme?.colors?.constants?.primary?.medium};
        `}
`;

export const OptionIcon = styled.div``;
