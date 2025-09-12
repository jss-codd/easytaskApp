
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const EyeIcon = ({ size = 20, color = 'black' }) => {
    return (
        <Svg width={size} height={size} fill={color} viewBox="0 0 24 24">
            <Path
                stroke={color}
                fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
        </Svg>
    );
};

const OpenEyeIcon = ({ size = 20, color = 'black' }) => {
    return (
        <Svg width={size} height={size} fill={color} viewBox="0 0 24 24">
            <Path stroke={color} strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
            <Path stroke={color} strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </Svg>
    );
};

export default { EyeIcon, OpenEyeIcon }


