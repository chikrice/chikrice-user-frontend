import { useCallback, useMemo } from 'react';
import { alpha, Box, Card, Typography, useTheme } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import CircleButton from 'src/components/circle-button';

export default function AddNewMeal() {
  const { t } = useTranslate();
  const theme = useTheme();
  const plan = useStore((state) => state.plan);
  const createMeal = useStore((state) => state.createMeal);
  const mealIndex = useMemo(() => plan?.meals?.length ?? 0, [plan?.meals]);

  const handleCreateMeal = useCallback(async () => {
    try {
      createMeal(mealIndex);
    } catch (error) {
      console.log(error);
    }
  }, [mealIndex, createMeal]);

  return (
    <>
      {/* Mobile Circle Button */}
      <CircleButton
        icon="ph:plus-bold"
        width={55}
        style={{ right: 16 }}
        sx={{
          position: 'absolute',
          bottom: 122,
          display: { xs: 'block', md: 'none' },
        }}
        onClick={handleCreateMeal}
      />

      {/* Desktop Card Button */}
      <Card
        onClick={handleCreateMeal}
        sx={{
          display: { xs: 'none', md: 'flex' },
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          border: `2px dashed ${theme.palette.divider}`,
          backgroundColor: 'transparent',
          minHeight: 120,
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.light, 0.1),
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            py: 15,
          }}
        >
          <Iconify
            icon="ph:plus-bold"
            sx={{
              fontSize: 32,
              color: theme.palette.primary.main,
            }}
          />
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600 }}>
            {t('addNewMeal')}
          </Typography>
        </Box>
      </Card>
    </>
  );
}
