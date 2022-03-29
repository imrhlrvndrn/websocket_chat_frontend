import styled from 'styled-components';

export default styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: ${(props) => props.theme.colors.darkBackground};

    .mainApp {
        display: flex;
<<<<<<< HEAD:client/src/pages/StyledMainApp.js
        width: 90vw;
        height: 90vh;
        box-shadow: 0 0 10px 0 black;
        background-color: white;
        overflow: hidden;
=======
        width: 100%;
        height: 100%;
        /* box-shadow: 0 0 10px 0 black; */
>>>>>>> d2dc5469003d066c59c60d20edd316092111578d:client/src/pages/app/app.styledcomponent.js
    }
`;
