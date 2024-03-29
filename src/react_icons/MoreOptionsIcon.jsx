import React from 'react';

export const MoreOptionsIcon = ({ width, height, style, onClick }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            height={height ? height : '24'}
            viewBox='0 0 24 24'
            width={width ? width : '24'}
            style={style}
            onClick={onClick}
        >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
        </svg>
    );
};
