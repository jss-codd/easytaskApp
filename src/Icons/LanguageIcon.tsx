import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LanguageIcon = ({ size = 20, color = 'black' }) => {
    return (
        <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
            <Path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 19 3.5-9 3.5 9m-6.125-2h5.25M3 7h7m0 0h2m-2 0c0 1.63-.793 3.926-2.239 5.655M7.5 6.818V5m.261 7.655C6.79 13.82 5.521 14.725 4 15m3.761-2.345L5 10m2.761 2.655L10.2 15" />
        </Svg>
    );
};

export default LanguageIcon;