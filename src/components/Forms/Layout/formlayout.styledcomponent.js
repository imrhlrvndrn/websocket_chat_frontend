import styled from 'styled-components';

export const StyledCard = styled.div`
    position: relative;
    width: 700px;
    max-width: 90%;
    min-height: 400px;
    height: max-content;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* margin: 0 auto; */
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.mediumBackground};
`;

export const StyledCardContent = styled.div`
    margin-top: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
