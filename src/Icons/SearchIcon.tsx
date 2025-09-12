import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = ({ size = 20, color = 'black' }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Path stroke={color} strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
    </Svg>
  );
};

export default SearchIcon;

