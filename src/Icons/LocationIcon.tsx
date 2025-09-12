import React from 'react';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const LocationIcon = ({ size = 20, color = 'black' ,style}: { size?: number, color?: string, style?: StyleProp<ViewStyle> }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24" style={style} >
      <Path
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      />
      <Path
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
      />
    </Svg>
  );
};

export default LocationIcon;

