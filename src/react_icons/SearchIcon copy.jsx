export const SearchIcon = ({ color = 'currentColor', size = 26 }) => {
    return (
        <svg
            stroke={color}
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height={size}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    );
};
