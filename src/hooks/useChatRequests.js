import { useAuthentication } from '../context';

// requests
import { userBlocking } from '../http';

export const useChatRequests = () => {
    const [{ user }, authDispatch] = useAuthentication();

    const blockUser = async (user_id, isBlocked) => {
        try {
            const {
                data: { success, data },
            } = await userBlocking(user_id, isBlocked?.value ? 'unblock' : 'block');
            if (success)
                authDispatch({
                    type: 'SET_USER',
                    payload: { user: { ...user, blocked: data?.blocked } },
                });
        } catch (error) {
            console.error(error);
        }
    };

    return { blockUser };
};
