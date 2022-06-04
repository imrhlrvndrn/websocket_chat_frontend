import React from 'react';

// Styled components
import StyledAvatar from './avatar.styledcomponent';

export const Avatar = ({ url, altText, size, margin, borderRadius }) => {
    return (
        <StyledAvatar
            margin={margin}
            size={size ? size : '50px'}
            borderRadius={borderRadius || '50%'}
        >
            <img src={url} alt={altText ? altText : ''} />
        </StyledAvatar>
    );
};
