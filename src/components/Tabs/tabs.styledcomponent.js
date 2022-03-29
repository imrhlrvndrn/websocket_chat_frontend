import styled from 'styled-components';

export const TabContainer = styled.div`
    width: 100%;
    height: auto;
    padding: 0.2rem;
    margin-bottom: 2rem;
    border-radius: 30px;
    background: ${(props) => props.theme.colors.darkBackground};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: ${(props) => (props.align ? props.align : 'center')};
`;

export const Tab = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => props.width || '49%'};
    height: ${(props) => props.height || 'max-content'};
    margin: ${(props) => props.margin || '0'};
    padding: ${(props) => props.padding || '1rem'};
    border-radius: ${(props) => props.theme.spacing.sm};
    border-radius: 30px;
    transition: all 0.3s ease-in-out;
    background-color: ${(props) =>
        props.isActive ? props.theme.colors.mediumBackground : props.theme.colors.darkBackground};
    color: ${(props) => props.theme.colors.text};

    &:hover {
        background-color: ${(props) =>
            props.isActive
                ? props.theme.colors.mediumBackground
                : props.theme.colors.darkBackground};
    }

    &:last-of-type {
        margin: 0;
    }
`;
