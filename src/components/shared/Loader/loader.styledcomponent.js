import styled from 'styled-components';

export const Loader = styled.div`
    svg {
        animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
`;
