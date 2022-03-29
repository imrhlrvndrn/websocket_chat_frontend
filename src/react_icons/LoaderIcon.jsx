export const LoaderIcon = ({ color = 'currentColor', size = 56 }) => {
    return (
        <svg
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="25"
                cy="25"
                r="21.65"
                stroke="#D4D4D4"
                strokeWidth="6.7"
            />
            <mask id="a" fill="#fff">
                <path d="M25 0a25 25 0 1 0 25 25h-6.628A18.372 18.372 0 1 1 25 6.628V0Z" />
            </mask>
            <path
                d="M25 0a25 25 0 1 0 25 25h-6.628A18.372 18.372 0 1 1 25 6.628V0Z"
                stroke="#004EF5"
                strokeWidth="8"
                mask="url(#a)"
            />
        </svg>
    );
};
