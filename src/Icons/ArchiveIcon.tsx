
import React from 'react';
import Svg, { Path } from 'react-native-svg';


interface ArchiveIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
  disabled?: boolean;
}

const ArchiveIcon = ({ size = 20, color = 'black', onPress, disabled }: ArchiveIconProps) => {
  return (
    <Svg width={size} height={size} fill='none' viewBox="0 0 24 24" onPress={onPress} disabled={disabled}>
      <Path opacity={disabled ? 0.5 : 1} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v5m0 0 2-2m-2 2-2-2M3 6v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Zm2 2v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8H5Z" />
    </Svg>
  );
};

export default ArchiveIcon;


