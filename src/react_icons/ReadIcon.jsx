import React from 'react';

export const ReadIcon = ({ width, height, fill, style }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            height={height ? height : '24'}
            viewBox='0 0 24 24'
            width={width ? width : '24'}
            style={style && style}
        >
            <path d='M0 0h24v24H0z' fill='none' />
            <path
                fill={fill ? fill : 'black'}
                d='M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z'
            />
        </svg>
    );
};
