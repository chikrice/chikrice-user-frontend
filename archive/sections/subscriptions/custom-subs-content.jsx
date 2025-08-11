import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Grid, Link, useTheme } from '@mui/material';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import { useTranslate } from 'src/locales';
import { RouterLink } from 'src/routes/components';

export default function CustomSubscriptionContent({ activeDay, plans }) {
  const { t } = useTranslate();

  const theme = useTheme();

  return (
    <Box>
      {plans.map((plan) => (
        <Stack className={'subs__tour__3'} sx={{ mb: 4 }} key={nanoid()}>
          <Typography variant="h3" sx={{ mb: '8px' }}>
            {t(plan.category)}
          </Typography>

          <Grid container columns={16} spacing={1.5}>
            {plan.diets.map((item) => (
              <Grid item xs={8} key={nanoid()}>
                <Link
                  component={RouterLink}
                  href={paths.subscriptions.custom}
                  state={{ ...item, daysCount: activeDay, type: 'custom' }}
                >
                  <StyledCard sx={{ position: 'relative' }}>
                    <CardContent sx={{ p: 1.5 }}>
                      <Image
                        sx={{ width: 85, borderRadius: 1.5 }}
                        ratio={'4/3'}
                        src={item.imgSrc}
                        alt={item.title}
                        width={50}
                      />

                      <Typography
                        sx={{ mt: 0.5 }}
                        variant="subtitle2"
                        color={theme.palette.text.secondary}
                      >
                        {t(item.title)}
                      </Typography>
                    </CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        position: 'absolute',
                        bottom: '5%',
                        right: '10%',
                        width: 'fit-content',
                      }}
                    >
                      {item.price}
                      {t('AED')}
                    </Typography>
                  </StyledCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Stack>
      ))}
    </Box>
  );
}
CustomSubscriptionContent.propTypes = {
  activeDay: PropTypes.number,
  plans: PropTypes.array,
};

const StyledCard = styled(Card)(() => ({
  borderRadius: 16,
  aspectRatio: '9/8',
}));
