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
