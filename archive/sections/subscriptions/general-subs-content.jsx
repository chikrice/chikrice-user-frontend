import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Grid, Link, useTheme } from '@mui/material';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import mealSrc from 'src/assets/icons/meal.png';
import snackSrc from 'src/assets/icons/snack.png';
import { RouterLink } from 'src/routes/components';

export default function GeneralSubscriptionContent({ activeDay, plans }) {
  const { t } = useTranslate();
  const theme = useTheme();

  return (
    <Box>
      <Stack>
        <Typography variant="h3" sx={{ mb: '8px' }}>
          {t('meals')}
        </Typography>

        <Grid container columns={16} spacing={1.5} className="subs__tour__4">
          {plans.meals.map((meal) => (
            <Grid item xs={8} key={nanoid()}>
              <Link
                component={RouterLink}
                href={paths.subscriptions.general}
                state={{ ...meal, daysCount: activeDay, type: 'meal' }}
              >
                <StyledCard sx={{ position: 'relative' }}>
                  <CardContent sx={{ p: 1.5 }}>
                    <Stack
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        width: 'fit-content',
                        gap: 0.5,
                      }}
                    >
                      {[...Array(meal.count)].map(() => (
                        <Image
                          key={nanoid()}
                          sx={{ borderRadius: 50 }}
                          src={mealSrc}
                          alt={'meal'}
                          width={35}
                          height={35}
                        />
                      ))}
                    </Stack>
                    <Typography sx={{ mt: 0.5 }} variant="h6" color={theme.palette.text.secondary}>
                      {meal.count} {t('meal')}
                    </Typography>
                  </CardContent>
                  <Typography
                    variant="h4"
                    sx={{
                      position: 'absolute',
                      bottom: '5%',
                      right: '10%',
                      width: 'fit-content',
                    }}
                  >
                    {meal.price}
                    {t('AED')}
                  </Typography>
                </StyledCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <Typography variant="h3" sx={{ mb: '8px' }}>
          {t('snacks')}
        </Typography>

        <Grid container columns={16} spacing={1.5}>
          {plans.snacks.map((snack) => (
            <Grid item xs={8} key={nanoid()}>
              <Link
                component={RouterLink}
                href={paths.subscriptions.general}
                state={{ ...snack, daysCount: activeDay, type: 'snack' }}
              >
                <StyledCard sx={{ position: 'relative' }}>
                  <CardContent sx={{ p: 1.5 }}>
                    <Stack
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        width: 'fit-content',
                        gap: 0.5,
                      }}
                    >
                      {[...Array(snack.count)].map(() => (
                        <Image
                          key={nanoid()}
                          sx={{ borderRadius: 50 }}
                          src={snackSrc}
                          alt={'snack'}
                          width={35}
                          height={35}
                        />
                      ))}
                    </Stack>
                    <Typography sx={{ mt: 0.5 }} variant="h6" color={theme.palette.text.secondary}>
                      {snack.count} {t('snack')}
                    </Typography>
                  </CardContent>
                  <Typography
                    variant="h4"
                    sx={{
                      position: 'absolute',
                      bottom: '5%',
                      right: '10%',
                      width: 'fit-content',
                    }}
                  >
                    {snack.price}
                    {t('AED')}
                  </Typography>
                </StyledCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
GeneralSubscriptionContent.propTypes = {
  plans: PropTypes.object,
  activeDay: PropTypes.number,
};

const StyledCard = styled(Card)(() => ({
  borderRadius: 16,
  aspectRatio: '9/8',
}));
