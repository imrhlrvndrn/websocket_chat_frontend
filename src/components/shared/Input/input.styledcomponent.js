import styled from 'styled-components';

export const InputContainer = styled.div`
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || 'max-content'};
`;

export const InputField = styled.input`
    outline: none;
    width: 100%;
    min-width: 300px;
    border: 0.5px solid transparent;
    transition: 0.3s all ease-in-out;
    margin: ${(props) => props.margin || '0'};
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.fonts.size.md};
    padding: ${(props) => props.padding || '1rem 1.5rem'};
    border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '30px')};
    background-color: ${(props) => props.theme.colors[props.background || 'lightBackground']};

    &:focus,
    &:hover {
        border: 0.5px solid ${(props) => props.theme.colors.text};
    }

    &::placeholder {
        /* color: ${(props) => props.theme.colors.text}; */
    }
`;

export const PasswordFieldToggle = styled.div`
    position: absolute;
    right: 1rem;
`;
