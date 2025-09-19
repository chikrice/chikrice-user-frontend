import { useTheme } from '@mui/material/styles';

export function useGradients() {
  const theme = useTheme();
  return {
    topCurve: (
      <linearGradient id="topCurveGradient" x1="0" y1="0" x2="1000" y2="315" gradientUnits="userSpaceOnUse">
        <stop
          offset="0%"
          style={{
            stopColor: theme.palette.info.light,
            stopOpacity: 0.1,
          }}
        />
        <stop
          offset="50%"
          style={{
            stopColor: theme.palette.info.main,
            stopOpacity: 0.5,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: theme.palette.info.dark,
            stopOpacity: 1,
          }}
        />
      </linearGradient>
    ),

    horizontalLine: (
      <linearGradient
        id="horizontalLineGradient"
        x1="0"
        y1="0"
        x2="1000"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0%"
          style={{
            stopColor: theme.palette.warning.light,
            stopOpacity: 0.1,
          }}
        />
        <stop
          offset="50%"
          style={{
            stopColor: theme.palette.warning.main,
            stopOpacity: 0.5,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: theme.palette.warning.dark,
            stopOpacity: 1,
          }}
        />
      </linearGradient>
    ),

    bottomCurve: (
      <linearGradient
        id="bottomCurveGradient"
        x1="0"
        y1="700"
        x2="1000"
        y2="385"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0%"
          style={{
            stopColor: theme.palette.error.light,
            stopOpacity: 0.1,
          }}
        />
        <stop
          offset="50%"
          style={{
            stopColor: theme.palette.error.main,
            stopOpacity: 0.5,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: theme.palette.error.dark,
            stopOpacity: 1,
          }}
        />
      </linearGradient>
    ),

    rightLine: (
      <linearGradient id="rightLineGradient" x1="1000" y1="0" x2="2000" y2="0" gradientUnits="userSpaceOnUse">
        <stop
          offset="0%"
          style={{
            stopColor: theme.palette.primary.dark,
            stopOpacity: 1,
          }}
        />
        <stop
          offset="50%"
          style={{
            stopColor: theme.palette.primary.main,
            stopOpacity: 0.5,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: theme.palette.primary.light,
            stopOpacity: 0.1,
          }}
        />
      </linearGradient>
    ),

    chipGradient: (
      <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="objectBoundingBox">
        <stop
          offset="0%"
          style={{
            stopColor: '#f8fafc',
            stopOpacity: 1,
          }}
        />
        <stop
          offset="50%"
          style={{
            stopColor: '#e2e8f0',
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: '#cbd5e1',
            stopOpacity: 1,
          }}
        />
      </linearGradient>
    ),

    glowGradient: (
      <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="objectBoundingBox">
        <stop
          offset="0%"
          style={{
            stopColor: '#000',
            stopOpacity: 0.8,
          }}
        />
        <stop
          offset="50%"
          style={{
            stopColor: '#374151',
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: '#000',
            stopOpacity: 0.8,
          }}
        />
      </linearGradient>
    ),

    cpuGradient: (
      <linearGradient id="cpuGradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0" x2="200%" y2="0">
        <stop
          offset="0%"
          style={{
            stopColor: '#000',
            stopOpacity: 0,
          }}
        />
        <stop
          offset="50%"
          style={{
            stopColor: '#2EB9DF',
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: '#9E00FF',
            stopOpacity: 0,
          }}
        />
        <animateTransform
          attributeName="gradientTransform"
          type="translate"
          from="-100 0"
          to="100 0"
          dur="4s"
          repeatCount="indefinite"
        />
      </linearGradient>
    ),

    sweepMask: (
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
    ),
  };
}
