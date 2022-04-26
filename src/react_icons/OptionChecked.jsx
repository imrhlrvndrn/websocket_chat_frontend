export const OptionChecked = ({ color = 'currentColor', size = 30, onClick }) => {
    return (
        <svg
            width={size}
            height={size}
            version='1.1'
            viewBox='0 0 700 700'
            fill={color}
            onClick={onClick}
        >
            <path d='m105 35v490h490v-490zm199.85 350-82.25-102.9 27.301-21.699 57.746 72.098 143.68-143.68 24.852 24.852z' />
        </svg>
    );
};
