import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LogoutIcon = ({ size = 20, color = 'black' }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
      />
    </Svg>
  );
};

export default LogoutIcon;

