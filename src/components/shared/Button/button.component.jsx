import { StyledButton } from './button.styledcomponent';

export const Button = (props) => {
    const { children } = props;

    return (
        <StyledButton type={props.type || 'button'} {...props}>
            {children}
        </StyledButton>
    );
};
