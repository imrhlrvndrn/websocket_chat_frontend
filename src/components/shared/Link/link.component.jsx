import { Link as ReactRouterLink } from 'react-router-dom';

// styles
import { StyledLink } from './link.styledcomponent';

export const Link = ({ href, children }) => {
    return <ReactRouterLink href={href}>{children}</ReactRouterLink>;
};
