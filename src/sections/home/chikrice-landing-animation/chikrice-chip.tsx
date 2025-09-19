import { useTheme } from '@mui/material/styles';

import { useGradients } from './gradients';

export function ChikriceChip() {
  const theme = useTheme();
  const gradients = useGradients();

  return (
    <g>
      <defs>
        {gradients.cpuGradient}
        {gradients.sweepMask}

        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
        </filter>

        <mask id="sweepMask">
          <rect x="0" y="0" width="200" height="200" fill="black" />
          <rect x="0" y="0" width="60" height="200" fill="white">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-60 0; 200 0; -60 0"
              dur="4s"
              repeatCount="indefinite"
            />
          </rect>
        </mask>

        {/* Fading line mask */}
        <mask id="fadingLineMask">
          <rect x="900" y="280" width="200" height="40" fill="black" />
          <rect x="900" y="280" width="60" height="40" fill="white">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-60 0; -60 0; 200 0; -60 0"
              keyTimes="0; 0.4; 0.6; 1"
              dur="6s"
              repeatCount="indefinite"
            />
          </rect>
        </mask>

        {/* Bottom fading line mask */}
        <mask id="bottomFadingLineMask">
          <rect x="900" y="380" width="200" height="40" fill="black" />
          <rect x="900" y="380" width="60" height="40" fill="white">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-60 0; -60 0; 200 0; -60 0"
              keyTimes="0; 0.4; 0.6; 1"
              dur="6s"
              repeatCount="indefinite"
              begin="3s"
            />
          </rect>
        </mask>
      </defs>

      {/* Chip background with rounded corners */}
      <rect
        x="900"
        y="250"
        width="200"
        height="200"
        rx="20"
        ry="20"
        fill="black"
        strokeWidth="6"
        filter="url(#dropShadow)"
      />

      {/* CPU lines */}
      <g>
        {/* Top line - L-shaped path */}
        <path
          d="M 902 290 L 950 290 L 950 310 L 1097 310"
          stroke="url(#cpuGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          mask="url(#fadingLineMask)"
        />

        {/* Bottom line - different L-shaped path */}
        <path
          d="M 900 400 L 980 400 L 980 420 L 1100 420"
          stroke="url(#cpuGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          mask="url(#bottomFadingLineMask)"
        />
      </g>

      {/* Chikrice logo text */}
      <text
        x="1000"
        y="355"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill={theme.palette.text.secondary}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        CHIKRICE
      </text>
    </g>
  );
}
