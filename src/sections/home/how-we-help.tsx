import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { Button, Card, CardContent, CardHeader, Container, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import StreakTable from 'src/components/streak-table';
import { meal, plan, recommendedMeals, roadmap } from 'src/data';
import { MotionViewport, varFade } from 'src/components/animate';

import MealCard from '../dashboard/meal-card';
import MacrosBar from '../dashboard/macros-bar';
import RoadmapOverview from '../progress/roadmap-overview';
import SuggestionItem from '../dashboard/meal-suggestion/suggestion-item';

import type { ActivityLog, Meal, Overview } from 'chikrice-types';

// -------------------------------------

export default function HowWeHelpYou({ onCallToAction }) {
  const { t } = useTranslate();

  return (
    <Container mt={10} component={MotionViewport}>
      <Stack component={m.div} variants={varFade().inUp}>
        <Typography variant="subtitle2" mb={3} color={'text.secondary'}>
          {t('whoWeAre')}
        </Typography>
        <Typography variant="h2">
          <span>chikrice</span> {t('solveYourPorblem')}
        </Typography>
      </Stack>

      <Stack spacing={2} mt={3} flexDirection={{ md: 'row' }}>
        <Card sx={{ width: '100%', borderRadius: 4 }} component={m.div} variants={varFade().inUp}>
          <CardHeader title={t('feature1Title')} subheader={t('feature1Subtitle')} />
          <CardContent>
            <MacrosBar plan={plan} />
            <br />
            <MealCard
              meal={meal}
              index={0}
              plan={plan}
              isAction={false}
              ingredients={Object.values(meal?.ingredients).flat()}
            />
          </CardContent>
        </Card>
        <Card sx={{ width: '100%', borderRadius: 4 }} component={m.div} variants={varFade().inUp}>
          <CardHeader title={t('feature3Title')} subheader={t('feature3Subtitle')} />
          <CardContent>
            <RoadmapOverview overview={roadmap.overview as unknown as Overview} />
          </CardContent>
        </Card>
        <Card sx={{ width: '100%', borderRadius: 4 }} component={m.div} variants={varFade().inUp}>
          <CardHeader title={t('feature4Title')} subheader={t('feature4Subtitle')} />
          <CardContent>
            <Typography variant="subtitle2" textAlign={'start'} marginInlineStart={1}>
              {t('suggestions')} {1}
            </Typography>
            <Stack
              flexDirection={'row'}
              gap={1}
              mt={1}
              mb={4}
              sx={{
                p: 1,
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                '::-webkit-scrollbar': { display: 'none' },
                pr: 3,
              }}
            >
              {recommendedMeals.map((meal: Meal) => (
                <SuggestionItem
                  key={meal?._id}
                  meal={meal}
                  planId={plan?.id}
                  ingredients={Object.values(meal?.ingredients).flat()}
                />
              ))}
            </Stack>
            <StreakTable
              totalDays={roadmap.overview.totalDays}
              activityLog={roadmap.activityLog as unknown as ActivityLog[]}
              onGoingDay={31}
            />
          </CardContent>
        </Card>
      </Stack>
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 5, maxWidth: 350 }}
        onClick={onCallToAction}
      >
        {t('startNow')}
      </Button>
    </Container>
  );
}

HowWeHelpYou.propTypes = {
  onCallToAction: PropTypes.func,
};
