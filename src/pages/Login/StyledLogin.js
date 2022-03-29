import styled from 'styled-components';

export default styled.div`
    width: 100%;
    height: 100vh;
    background-color: #f8f8f8;
    display: grid;
    place-content: center;

    .loginContainer {
        width: max-content;
        min-width: 400px;
        height: auto;
        min-height: 400px;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        box-shadow: 0px 0 8px 0 rgba(0, 0, 0, 0.61);

        img {
            width: 100px;
            height: auto;
            object-fit: contain;
        }

        button {
            display: block;
            margin-top: 2rem;
            background-color: rgb(${(props) => props.theme.constants.colorBackground});
            color: white;
        }
    }
`;
