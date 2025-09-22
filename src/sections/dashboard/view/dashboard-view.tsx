import { Container, Box, Grid, useTheme, useMediaQuery } from '@mui/material';

import useStore from 'src/store';
import { ReloadPage } from 'src/components/error-screen';
import { LoadingScreen } from 'src/components/loading-screen';

import Meals from '../meals-list';
import MacrosBar from '../macros-bar';
import AddNewMeal from '../add-new-meal';
import DayNavigator from '../day-navigator';
import DesktopActionPanel from '../desktop-action-panel/desktop-action-panel';
import Scrollbar from 'src/components/scrollbar';

// -------------------------------------

export default function DashboardView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const day = useStore((state) => state.day);
  const plan = useStore((state) => state.plan);
  const plans = useStore((state) => state.plans);
  const totalDays = useStore((state) => state.totalDays);
  const roadmapLoading = useStore((state) => state.roadmapLoading);
  const roadmapError = useStore((state) => state.roadmapError);
  const planError = useStore((state) => state.planError);
  const isAuthLoading = useStore((state) => state.isAuthLoading);
  const planLoading = useStore((state) => state.planLoading);
  const updateDay = useStore((state) => state.updateDay);

  // Find the meal currently in edit mode
  const editingMeal = plan?.meals?.find((meal) => meal.mode === 'edit');
  const editingMealIndex = plan?.meals?.findIndex((meal) => meal.mode === 'edit') ?? -1;
  const editingMealIngredients = editingMeal ? Object.values(editingMeal.ingredients).flat() : [];

  // Add comprehensive loading checks
  const isLoading = isAuthLoading || roadmapLoading;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (roadmapError || planError) {
    return <ReloadPage />;
  }

  // Mobile layout (single column)
  if (isMobile) {
    return (
      <Container sx={{ px: { xs: 0, sm: 3 } }}>
        <MacrosBar plan={plan} />
        <Meals plan={plan} planLoading={planLoading} />
        <AddNewMeal />
        <DayNavigator
          day={day}
          plan={plan}
          plans={plans}
          totalDays={totalDays}
          planLoading={planLoading}
          isDisableMealsActions={true}
          updateDay={updateDay}
        />
      </Container>
    );
  }

  // Desktop layout (two columns)
  return (
    <Container maxWidth="lg">
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Left Column - Scrollable Meals */}
        <Grid item xs={12} md={5.5}>
          <Scrollbar>
            <Meals plan={plan} planLoading={planLoading} />
          </Scrollbar>
        </Grid>

        {/* Right Column - Sticky Sidebar */}
        <Grid item xs={12} md={6.5}>
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Macros Bar at top */}
            <Box sx={{ my: 2, flexShrink: 0 }}>
              <MacrosBar plan={plan} />
            </Box>

            {/* Action Panel - Show when meal is in edit mode */}
            {editingMeal && editingMealIndex >= 0 ? (
              <DesktopActionPanel
                planId={plan.id}
                mealIndex={editingMealIndex}
                selectedIngredients={editingMealIngredients}
              />
            ) : (
              <AddNewMeal />
            )}

            {/* Day Navigator at bottom */}
            <Box sx={{ flex: 1, mt: 2 }}>
              <DayNavigator
                day={day}
                plan={plan}
                plans={plans}
                totalDays={totalDays}
                planLoading={planLoading}
                isDisableMealsActions={true}
                updateDay={updateDay}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
