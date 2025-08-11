import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';

import Logo from '../logo';

// ----------------------------------------------------------------------

export default function SplashScreen({ sx, ...other }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        right: 0,
        width: 1,
        bottom: 0,
        height: 1,
        zIndex: 9998,
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        ...sx,
      }}
      {...other}
    >
      <>
        <m.div
          animate={{
            scale: [1, 0.9, 0.9, 1, 1],
            opacity: [1, 0.48, 0.48, 1, 1],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeatDelay: 1,
            repeat: Infinity,
          }}
        >
          <Logo disabledLink sx={{ width: 64, height: 64 }} />
        </m.div>

        <Box
          component={m.div}
          animate={{
            scale: [1.6, 1, 1, 1.6, 1.6],
            rotate: [270, 0, 0, 270, 270],
            opacity: [0.25, 1, 1, 1, 0.25],
            borderRadius: ['25%', '25%', '50%', '50%', '25%'],
          }}
          transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
          sx={{
            width: 100,
            height: 100,
            position: 'absolute',
            border: `solid 3px #000`,
          }}
        />

        <Box
          component={m.div}
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            opacity: [1, 0.25, 0.25, 0.25, 1],
            borderRadius: ['25%', '25%', '50%', '50%', '25%'],
          }}
          transition={{
            ease: 'linear',
            duration: 3.2,
            repeat: Infinity,
          }}
          sx={{
            width: 120,
            height: 120,
            position: 'absolute',
            border: `solid 8px #000`,
          }}
        />
      </>
    </Box>
  );
}

SplashScreen.propTypes = {
  sx: PropTypes.object,
};
