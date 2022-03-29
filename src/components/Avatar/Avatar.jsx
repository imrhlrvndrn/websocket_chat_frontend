import React from 'react';

// Styled components
import StyledAvatar from './StyledAvatar';

// Images
import WhatsAppDefault from '../../React icons/whatsapp_default.svg';

const Avatar = ({ imgUrl, altText, width, height }) => {
    return (
        <StyledAvatar width={width ? width : '50px'} height={height ? height : '50px'}>
            <img src={imgUrl ? imgUrl : WhatsAppDefault} alt={altText ? altText : ''} />
        </StyledAvatar>
    );
};

export default Avatar;
