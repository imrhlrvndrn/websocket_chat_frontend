export const getChatName = ({ logged_user, chat }) => {
    if (chat?.is_group_chat) return chat?.name;

    return chat?.users?.filter((chat_user) => chat_user._id !== logged_user?._id)[0]?.full_name;
};

export const getChatAvatar = ({ logged_user, chat }) => {
    if (chat?.is_group_chat && chat?.avatar) return chat?.avatar;
    else if (chat?.is_group_chat && !chat?.avatar)
        return 'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80';

    return (
        chat?.users?.filter((chat_user) => chat_user._id !== logged_user?._id)[0]?.avatar ||
        'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80'
    );
};

export const isUserBlocked = ({ users, logged_user }) => {
    let other_user = users?.filter((user) => user?._id !== logged_user?._id)?.[0];

    let is_logged_user_blocked = other_user?.blocked?.includes(logged_user?._id);
    let is_other_user_blocked = logged_user?.blocked?.includes(other_user?._id);

    if (is_logged_user_blocked) return { value: true, user: 'other_user' };
    else if (is_other_user_blocked) return { value: true, user: 'logged_user' };
    return { value: false, user: '' };
};
