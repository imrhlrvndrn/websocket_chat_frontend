import { ReactComponent as CloseIcon } from '../../../react_icons/close-24px.svg';

// styles
import { Flex, Text } from '../../../styled_components';

// components
import { Avatar } from '../../';
import { useTheme } from '../../../context';

export const UserPill = ({ user, onClose }) => {
    const [{ theme }] = useTheme();

    return (
        <Flex
            tabIndex={0}
            width='max-content'
            padding='0.5rem'
            margin='1rem 1rem 1rem 0'
            key={user?._id}
            style={{
                borderRadius: '10px',
                backgroundColor: theme?.colors?.constants?.primary?.dark,
            }}
        >
            <Avatar size='30px' margin='0 0.5rem 0 0' url={user?.avatar} alt={user?.full_name} />
            <Text size='body/small' width='max-content'>
                {user?.full_name}
            </Text>
            <CloseIcon style={{ fill: theme?.colors?.icon }} onClick={() => onClose()} />
        </Flex>
    );
};
