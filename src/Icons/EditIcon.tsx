import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface EditIconProps {
    size?: number;
    color?: string;
    onPress?: () => void;
}

const EditIcon = ({ size = 20, color = 'black' ,onPress}: EditIconProps) => {
    return (
        <Svg width={size} height={size} fill='none' viewBox="0 0 24 24" onPress={onPress}>
            {/* <Path stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11v5m0 0 2-2m-2 2-2-2M3 6v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Zm2 2v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8H5Z"/> */}
            <Path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
        </Svg>
    );
};

export default EditIcon;
