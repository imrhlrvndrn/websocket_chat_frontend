import styled from 'styled-components';

export default styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    height: max-content;
    margin: ${(props) => props?.margin || '0'};

    img {
        width: ${(props) => props?.size || '50px'};
        height: ${(props) => props?.size || '50px'};
        border-radius: ${(props) => props?.borderRadius || '50%'};
        object-fit: cover;
        object-position: center;
    }size
`;
