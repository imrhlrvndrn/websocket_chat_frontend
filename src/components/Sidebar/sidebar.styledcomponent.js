import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-direction: column;
<<<<<<< HEAD:client/src/components/Sidebar/StyledSidebar.js
    width: ${(props) => (props.chatInfo === false ? '30%' : '25%')};
=======
    width: 25%;
>>>>>>> d2dc5469003d066c59c60d20edd316092111578d:client/src/components/Sidebar/sidebar.styledcomponent.js

    .sidebar__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        height: max-content;
        background-color: ${(props) => props.theme.colors.darkBackground};

        &__icons {
            svg {
                cursor: pointer;
                margin-left: 2rem;
                fill: ${(props) => props.theme.colors.icon};
            }
        }
    }

    .sidebarSearchContainer {
        width: 100%;
        padding: 1rem 0;
        border-top: 2px solid ${(props) => props.theme.colors.mediumBackground};
        border-bottom: 2px solid ${(props) => props.theme.colors.mediumBackground};
        background-color: ${(props) => props.theme.colors.darkBackground};

        &__input {
            width: 90%;
            margin: 0 auto;
            border-radius: 10px;
            background-color: ${(props) => props.theme.colors.mediumBackground};
            display: flex;
            justify-content: space-evenly;
            align-items: center;

            svg {
                flex: 0.2;
                fill: ${(props) => props.theme.colors.icon};
            }

            input {
                height: 45px;
                flex: 0.8;
                padding: 1rem 0;
                color: ${(props) => props.theme.colors.text};
            }
        }
    }

    .sidebarChat {
        flex: 1;
        background-color: ${(props) => props.theme.colors.darkBackground};
        height: auto;
        overflow-y: auto;

        .addNewChat {
            padding: 2rem 1rem;
            text-align: center;
            background-color: rgba(${(props) => props.theme.constants.colorBackground}, 0.2);
        }
    }
`;
