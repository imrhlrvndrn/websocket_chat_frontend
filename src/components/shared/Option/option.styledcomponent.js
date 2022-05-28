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

    &:hover,
    &:focus {
        background-color: ${(props) => props?.theme?.colors?.mediumBackground};
    }

    input {
        display: none;
    }

    svg {
        cursor: pointer;
    }
`;

export const OptionIcon = styled.div``;
