export const getDMChatName = ({ logged_user, chat_users }) =>
    chat_users.filter((chat_user) => chat_user._id !== logged_user?._id)[0]?.full_name;
