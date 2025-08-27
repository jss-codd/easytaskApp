import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MenuIcon = ({ size = 20, color = 'black' }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="2"
        d="M5 7h14M5 12h14M5 17h14"
      />
    </Svg>
  );
};

export default MenuIcon;
