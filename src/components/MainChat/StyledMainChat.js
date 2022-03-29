import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-direction: column;
    width: ${(props) => (props.chatInfo === false ? '70%' : '50%')};

    .mainChat__header {
        padding: 1rem;
        display: flex;
        align-items: center;
        background-color: rgb(${(props) => props.theme.mediumBackground});
        border-left: 1px solid rgb(${(props) => props.theme.lightestBackground});

        img {
            margin-right: 1rem;
        }

        &__info {
            flex: 1;

            &__lastSeen {
                margin-top: 0.5rem;
                font-size: 0.8rem;
            }
        }

        &__icons {
            position: relative;
            display: flex;

            svg {
                cursor: pointer;
                margin-left: 2rem;
                fill: rgb(${(props) => props.theme.icon});
            }

            .chatOptionsModal {
                background-color: rgb(${(props) => props.theme.mediumBackground});
                position: absolute;
                top: calc(100% + 1.6rem);
                right: 0;
                width: max-content;
                z-index: 5;

                &__options {
                    display: block;
                    padding: 1rem 2rem;
                    width: 100%;
                    font-size: 1rem;
                    transition: all 0.4s ease-in-out;
                    cursor: pointer;

                    &:hover {
                        background-color: rgb(${(props) => props.theme.darkBackground});
                    }
                }
            }
        }
    }

    .mainChat__body {
        width: 100%;
        padding: 0 1rem;
        background: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        overflow-y: auto;
        overflow-x: hidden;
        flex: 1;

        /* width */
        ::-webkit-scrollbar {
            width: 10px;
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
    }

    .mainChat__chatbarContainer {
        display: flex;
        position: relative;
        align-items: center;
        padding: 0.5rem 1rem;
        background-color: rgb(${(props) => props.theme.mediumBackground});

        svg {
            cursor: pointer;
            fill: rgb(${(props) => props.theme.icon});
        }

        &__chatForm {
            flex: 1;
            border-radius: 30px;
            margin: 0 1rem;
            padding: 0 0 0 1rem;
            background-color: rgb(${(props) => props.theme.lightestBackground});
            display: flex;
            align-items: center;

            input {
                flex: 1;
            }

            button {
                border-radius: 30px;
                color: rgb(${(props) => props.theme.constants.lightText});
                background-color: rgb(${(props) => props.theme.constants.colorBackground});
            }
        }

        &__joinChatGroupButton {
            cursor: pointer;
            text-align: center;
            position: absolute;
            top: calc(-100% - 1rem);
            left: 0;
            padding: 1rem;
            width: 100%;
            height: calc(100% + 2rem);
            background-color: rgb(${(props) => props.theme.constants.colorBackground});
            color: white;
        }
    }
`;
