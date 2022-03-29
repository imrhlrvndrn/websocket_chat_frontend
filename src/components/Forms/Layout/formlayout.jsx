import { Fragment } from 'react';

// styles
import { Text } from '../../../styledcomponents';
import { StyledCard, StyledCardContent } from './formlayout.styledcomponent';

export const Card = ({ children, style }) => {
    return <StyledCard style={style}>{children}</StyledCard>;
};

export const CardHeader = ({ text = 'This is the card header' }) => {
    return (
        <Text width='max-content' weight='medium' size='heading3/large' as='h1' margin='0 0 1rem 0'>
            {text}
        </Text>
    );
};

export const CardContent = ({ children }) => {
    return <StyledCardContent>{children}</StyledCardContent>;
};
