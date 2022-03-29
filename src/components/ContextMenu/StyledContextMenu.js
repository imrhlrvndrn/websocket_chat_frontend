import styled from 'styled-components';

export default styled.div`
    position: absolute;
    background-color: black;

    .contextMenu_item {
        color: #eee;
        display: block;
        width: 100%;
        padding: 1rem 1.5rem;
        transition: all 0.4s ease-in-out;

        &:hover {
            background-color: #222;
            cursor: pointer;
        }
    }
`;
