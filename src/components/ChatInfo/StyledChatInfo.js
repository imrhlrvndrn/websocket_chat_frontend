import styled from 'styled-components';

export default styled.div`
    width: 25%;
    overflow-y: auto;
    background-color: rgb(${(props) => props.theme.mediumBackground});

    /* width */
    ::-webkit-scrollbar {
        width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .chat_info_header {
        top: 0;
        position: sticky;
        display: flex;
        height: 81px;
        align-items: center;
        padding: 0 1rem;
        border-left: 1px solid rgb(${(props) => props.theme.lightBackground});
        background-color: rgb(${(props) => props.theme.mediumBackground});

        svg {
            cursor: pointer;
            fill: rgb(${(props) => props.theme.icon});
            margin-right: 1rem;
        }
    }

    .chat_info_body {
        padding: 1rem 0;

        img {
            display: block;
            margin: 0 auto 2rem auto;
            width: 200px;
            height: 200px;
            border-radius: 50%;
        }
    }
`;
