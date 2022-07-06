import styled from 'styled-components';

export const Dropdown = styled.div`
    position: absolute;
    top: calc(100% - 5px);
    right: 0;
    min-width: 300px;
    max-width: 400px;
    padding: 0.5rem;
    border-radius: 10px;
    z-index: 99;
    background-color: ${(props) => props?.theme?.colors?.darkBackground};
`;

export const DropdownItem = styled.div`
    display: flex;
    padding: 0.5rem;
    cursor: pointer;
    align-items: center;
    border-radius: 10px;
    transition: background 0.4s ease-in-out;

    &:hover {
        background-color: ${(props) => props?.theme?.colors?.lightBackground};
    }

    &:last-child {
        margin-bottom: 0;
    }

    .icon-left {
        margin-right: 1rem;
    }

    .icon-right {
        width: 50px;
        height: 50px;
        display: flex;
        margin-left: auto;
        align-items: center;
        justify-content: flex-end;
    }

    .icon-left,
    .icon-right {
        cursor: pointer;
    }
`;
