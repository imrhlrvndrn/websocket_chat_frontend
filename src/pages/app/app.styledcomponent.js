import styled from 'styled-components';

export default styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: ${(props) => props.theme.colors.darkBackground};

    .mainApp {
        display: flex;
        width: 100%;
        height: 100%;
        /* box-shadow: 0 0 10px 0 black; */
    }
`;
