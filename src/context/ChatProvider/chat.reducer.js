export const initialChatState = {
    new_room: {
        type: 'DM',
        name: 'DM',
    },
    open_chat: {
        _id: '',
        name: '',
        users: [],
        group_admins: [],
        latest_message: {},
        is_group_chat: false,
    },
};

export const chatReducers = (state, action) => {
    switch (action.type) {
        case 'SET_NEW_ROOM': {
            return { ...state, new_room: action.payload };
        }

        default: {
            return state;
        }
    }
};
