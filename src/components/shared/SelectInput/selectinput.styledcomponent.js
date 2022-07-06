import styled from 'styled-components';

export const SelectInputContainer = styled.div`
    padding: 1rem;
    margin: 1rem 0;
    cursor: pointer;
    border-radius: ${(props) => props?.theme?.spacing?.xs};
    background-color: ${(props) => props.theme.colors.mediumBackground};

    &:focus {
    }
`;

export const SelectOptionsContainer = styled.div`
    margin: ${(props) => props?.margin || '1rem 0'};
    overflow: hidden;
    border-radius: ${(props) => props?.theme?.spacing?.xs};
    background-color: ${(props) => props?.background || props?.theme?.colors?.mediumBackground};
`;

export const SelectOption = styled.div`
    padding: 1rem;
    outline: none;
    transition: all 0.4s ease-in-out;

    &:hover,
    &:focus {
        cursor: pointer;
        background-color: ${(props) => props?.theme?.colors?.lightBackground};
    }
`;
