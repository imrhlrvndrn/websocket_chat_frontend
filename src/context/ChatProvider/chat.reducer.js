export const initialChatState = {
    new_chat: {
        name: 'DM',
        avatar: '',
        users: [],
        group_admins: [],
        latest_message: {},
        is_group_chat: false,
    },
    open_chat: {
        _id: '',
        name: '',
        avatar: '',
        users: [],
        group_admins: [],
        latest_message: {},
        is_group_chat: false,
    },
    user_chats: [],
};

export const chatReducers = (state, action) => {
    switch (action.type) {
        case 'SET_NEW_CHAT': {
            return { ...state, new_chat: action?.payload };
        }

        case 'SET_USER_CHATS': {
            return { ...state, user_chats: action?.payload };
        }

        case 'SORT_CHATS': {
            return {
                ...state,
                user_chats: action?.payload?.sort(
                    (a, b) => Date.parse(b.updatedAt) - Date.parse(a?.updatedAt)
                ),
            };
        }

        case 'SET_OPEN_CHAT': {
            return {
                ...state,
                open_chat: action?.payload,
                user_chats: state?.user_chats?.map((chat) =>
                    chat?._id === action?.payload?._id ? action?.payload : chat
                ),
            };
        }

        default: {
            return state;
        }
    }
};
