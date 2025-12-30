import React from 'react';

const Logo = () => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-14" // Size adjustment as needed
        >
            <title>TN Logo</title>
            <text
                className="logo-path"
                x="50%"
                y="54%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ fontFamily: '"Dancing Script", cursive', fontWeight: 700, fontSize: '65px' }}
            >
                TN
            </text>
        </svg>
    );
};

export default Logo;
