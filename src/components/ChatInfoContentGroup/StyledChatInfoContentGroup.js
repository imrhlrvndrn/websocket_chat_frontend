import styled from 'styled-components';

export default styled.div`
    background-color: ${(props) =>
        props.color ? `rgba(${props.color}, 0.2)` : `rgb(${props.theme.lightBackground})`};
    padding: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};

    .copy {
        flex: 1;

        * {
            color: ${(props) => props.color && `rgb(${props.color})`};
        }

        h3 {
            width: max-content;
            font-size: 0.8rem;
        }

        p {
            width: 90%;
            display: block;
        }

        &_participants {
            width: 100%;
            display: flex;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid rgb(${(props) => props.theme.mediumBackground});

            img {
                width: 40px;
                height: 40px;
                object-fit: contain;
                border-radius: 50%;
                margin: 0 0.5rem 0 0;
            }

            p {
                font-size: 0.8rem;
                font-weight: 600;
            }
        }
    }

    svg {
        fill: ${(props) => props.color && `rgb(${props.color})`};
        flex: 0.2;
    }
`;
