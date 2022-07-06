export const withReactIcons = (WrappedComponent) => {
    return (props) => {
        return (
            <WrappedComponent
                size={24}
                color='currentColor'
                onClick={() => {}}
                style={{}}
                {...props}
            />
        );
    };
};
