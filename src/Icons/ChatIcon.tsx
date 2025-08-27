import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChatIcon = ({ size = 20, color = 'black' }) => {
  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 24 24">
      <Path
        stroke={color}
        fill-rule="evenodd"
        d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
        clip-rule="evenodd"
      />
      <Path
        stroke={color}
        fill-rule="evenodd"
        d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z"
        clip-rule="evenodd"
      />
    </Svg>
  );
};

export default ChatIcon;
