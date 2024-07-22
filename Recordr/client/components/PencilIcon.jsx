import React from 'react';
import { Svg, Rect, Polygon, G } from 'react-native-svg';

const PencilIcon = (props) => (
  <Svg width={17.24} height={19.98} viewBox="0 0 17.24 19.98" {...props}>
    <G id="c" data-name="Layer 1">
      <Rect
        x={11.81}
        y={3.59}
        width={1}
        height={2.45}
        transform="translate(.37 10.49) rotate(-46.78)"
        fill="#221f20"
        strokeWidth={0}
      />
      <Rect y={18.98} width={15.89} height={1} fill="#221f20" strokeWidth={0} />
      <Polygon
        points="4.47 16.87 3.76 16.17 15.81 4.12 13.04 1.41 1.13 13.32 1.13 16.52 .13 16.52 .13 12.9 13.04 0 17.24 4.11 4.47 16.87"
        fill="#221f20"
        strokeWidth={0}
      />
    </G>
  </Svg>
);

export default PencilIcon;