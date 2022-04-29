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
};

export const chatReducers = (state, action) => {
    switch (action.type) {
        case 'SET_NEW_CHAT': {
            return { ...state, new_chat: action.payload };
        }

        default: {
            return state;
        }
    }
};
