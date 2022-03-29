import styled from 'styled-components';

export default styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    height: max-content;
    margin: ${(props) => props.margin || '0'};

    img {
        width: ${(props) => props.width};
        height: ${(props) => props.height};
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
    }
`;
