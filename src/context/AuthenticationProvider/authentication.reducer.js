export const initialAuthState = {
    user: JSON.parse(localStorage.getItem('user')) || {
        _id: '',
        email: '',
        avatar: '',
        username: '',
        full_name: '',
    },
    new_user: {
        full_name: '',
        avatar: '',
        email: '',
        password: { strength: 0, value: '' },
    },
};

export const authenticationReducers = (state, action) => {
    switch (action.type) {
        case 'SET_USER': {
            const { user } = action.payload;

            localStorage.setItem('user', JSON.stringify(user));

            return { ...state, user };
        }

        case 'SET_NEW_USER': {
            return { ...state, new_user: action.payload };
        }

        default: {
            return state;
        }
    }
};
