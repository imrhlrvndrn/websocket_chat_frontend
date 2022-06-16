// components
import { Avatar } from '../..';

// styles
import { Flex } from '../../../styledcomponents';

export const TextAvatar = ({
    children,
    img = { url: '', alt: 'avatar', margin: '0 1rem 0 0', borderRadius: '50%' },
    ...props
}) => {
    return (
        <Flex onClick={() => onClick()} {...props}>
            <Avatar
                url={img?.url}
                altText={img?.alt}
                margin={img?.margin}
                borderRadius={img?.borderRadius}
            />
            {children}
        </Flex>
    );
};