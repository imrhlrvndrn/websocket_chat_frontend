export const getDMChatName = ({ logged_user, chat_users }) =>
    chat_users?.filter((chat_user) => chat_user._id !== logged_user?._id)[0]?.full_name;

export const getChatAvatar = ({ logged_user, chat_users }) =>
    chat_users?.filter((chat_user) => chat_user._id !== logged_user?._id)[0]?.avatar ||
    'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80';



