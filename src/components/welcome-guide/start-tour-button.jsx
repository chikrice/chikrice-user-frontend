import PropTypes from 'prop-types';
import { alpha, Box, Button, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import planSrc from 'src/assets/illustrations/plan.png';

import Image from '../image';

export default function StartTour({ isTourStarted, onClick }) {
  const { t } = useTranslate();
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1200,
        width: '100svw',
        height: '100svh',
        px: '10%',
        display: !isTourStarted ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        bgcolor: (theme) => alpha(theme.palette.background.default, 0.93),
      }}
    >
      <Image sx={{ borderRadius: 50 }} alt={'plan'} src={planSrc} />
      <Typography textAlign={'center'} variant="subtitle1">
        🎉 {t('roadmapCongrats')}
      </Typography>
      <Button
        size="large"
        color="success"
        fullWidth
        variant="contained"
        sx={{ mt: 4 }}
        onClick={onClick}
      >
        start
      </Button>
    </Box>
  );
}

StartTour.propTypes = {
  isTourStarted: PropTypes.bool,
  onClick: PropTypes.func,
};
