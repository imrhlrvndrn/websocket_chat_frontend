export const initialState = {
    user: null,
    // user: {
    //     email: 'ricksondm18@gmail.com',
    //     email_is_verified: true,
    //     name: 'Rahul Ravindran',
    //     phoneNumber: null,
    //     photoURL:
    //         'https://lh3.googleusercontent.com/a-/AOh14GgIsTRv4qVrjbFx0gUxDd3adq9N7sGco9jJSApYI5k=s96-c',
    //     userId: 'kMLDPLPkzLbSh1d4nh9DmrzWN703',
    // },
    // user: {
    //     email: 'rahulr1116@gmail.com',
    //     email_is_verified: true,
    //     name: 'Rahul Ravindran',
    //     phoneNumber: null,
    //     photoURL:
    //         'https://lh3.googleusercontent.com/a-/AOh14GiB6slrfXw0f0TBCgI2HTGJbQ0SqI3vazK8F96E=s96-c',
    //     userId: 'BNKn2NzBwqS0SgL3GLdlY3gI4d32',
    // },
    chatRooms: [],
    chatDetails: {},
    chatInfoMember: {},
    messages: [],
    chatInfo: false,
};

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.user };

        case 'SET_CHAT_ROOMS':
            return { ...state, chatRooms: action.chatRooms };

        case 'SET_CHAT_DETAILS':
            return { ...state, chatDetails: action.chatDetails };

        case 'SET_CHAT_INFO_MEMBER':
            return { ...state, chatInfoMember: action.chatInfoMember };

        case 'SET_CHAT_MESSAGES':
            return { ...state, messages: action.messages };

        case 'SET_CHAT_INFO':
            return { ...state, chatInfo: action.chatInfo };

        default:
            return state;
    }
};

export default reducer;
