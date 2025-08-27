import React from 'react';
import Svg, { Path } from 'react-native-svg';

const BackIcon = ({ size = 20, color = 'black' }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
       <Path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
    </Svg>
  );
};

export default BackIcon;

export const ArrowDown= ({ size = 20, color = 'black' }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 10 4 4 4-4"/>
    </Svg>
  );
};
