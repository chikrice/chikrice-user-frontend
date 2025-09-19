import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { useGradients } from './gradients';
import { ChikriceChip } from './chikrice-chip';

export default function AnimatedSVG() {
  const gradients = useGradients();
  const theme = useTheme();

  const isMobile = useResponsive('down', 'sm');
  const isTablet = useResponsive('down', 'md');

  const getScale = () => {
    if (isMobile) return 2;
    if (isTablet) return 1.5;
    return 1;
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        maxWidth: '2000px',
        transform: `scale(${getScale()})`,
        transformOrigin: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <svg viewBox="0 0 2000 700">
        <defs>
          {gradients.topCurve}
          {gradients.horizontalLine}
          {gradients.bottomCurve}
          {gradients.rightLine}
          {gradients.chipGradient}
          {gradients.glowGradient}
        </defs>
        <rect x="0" y="0" width="2000" height="700" fill="none" />

        <Typography component={'text'} fill="#ef4444" variant="h3" dy={'-5'}>
          🍚
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            rotate="auto"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.25 0.1 0.25 1"
          >
            <mpath href="#emoji1" />
          </animateMotion>
        </Typography>

        {/* Line 1: Top-left to center */}
        <path
          id="emoji1"
          d="M 0 0 Q 300 315 1000 315"
          stroke="url(#topCurveGradient)"
          strokeWidth="2"
          fill="none"
        />

        <Typography component={'text'} fill="#ef4444" variant="h3" dy={'-5'}>
          🫒
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            rotate="auto"
            calcMode="paced"
            keyTimes="0;0.5;1"
            keySplines="0.68 -0.55 0.265 1.55;0.68 -0.55 0.265 1.55"
          >
            <mpath href="#emoji2" />
          </animateMotion>
        </Typography>
        {/* Line 2: Left-middle to center */}
        <path
          id="emoji2"
          d="M 0 350 L 1000 350"
          stroke="url(#horizontalLineGradient)"
          strokeWidth="2"
          fill="none"
        />

        <Typography component={'text'} fill="#ef4444" variant="h3" dy={'-5'}>
          🥩
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            rotate="auto"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0 0 1 1"
          >
            <mpath href="#emoji3" />
          </animateMotion>
        </Typography>
        {/* Line 3: Bottom-left to center */}
        <path
          id="emoji3"
          d="M 0 700 Q 300 385 1000 385"
          stroke="url(#bottomCurveGradient)"
          strokeWidth="2"
          fill="none"
        />

        {/* Path for dots to follow and visual line */}
        <path
          id="horizontalLine"
          d="M 1000 350 L 2000 350"
          fill="none"
          stroke="url(#rightLineGradient)"
          strokeWidth="2"
        />

        {/* Dot 1: Pro */}
        <circle r="6" fill={theme.palette.error.main}>
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="1 0 1 1"
          >
            <mpath href="#horizontalLine" />
          </animateMotion>
        </circle>
        <Typography component={'text'} fill="#919EAB" fontSize="20" textAnchor="middle" dy="35">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="1 0 1 1"
          >
            <mpath href="#horizontalLine" />
          </animateMotion>
          pro: 3
        </Typography>

        {/* Dot 2: Carb */}
        <circle r="6" fill={theme.palette.info.main}>
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="1 0 1 1"
            begin="0.5s"
          >
            <mpath href="#horizontalLine" />
          </animateMotion>
        </circle>
        <Typography component={'text'} fill="#919EAB" fontSize="20" textAnchor="middle" dy="-35">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="1 0 1 1"
            begin="0.5s"
          >
            <mpath href="#horizontalLine" />
          </animateMotion>
          carb: 2
        </Typography>

        {/* Dot 3: Fat */}
        <circle r="6" fill={theme.palette.warning.main}>
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="1 0 1 1"
            begin="1s"
          >
            <mpath href="#horizontalLine" />
          </animateMotion>
        </circle>
        <Typography component={'text'} fill="#919EAB" fontSize="20" textAnchor="middle" dy="35">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="1 0 1 1"
            begin="1s"
          >
            <mpath href="#horizontalLine" />
          </animateMotion>
          fat: 5
        </Typography>

        {/* Chikrice Chip */}
        <ChikriceChip />
      </svg>
    </Box>
  );
}
