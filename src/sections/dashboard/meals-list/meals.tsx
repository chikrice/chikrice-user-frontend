import { Box, Skeleton } from '@mui/material';

import MealsList from './list';

import type { PlanType } from 'chikrice-types';

// -------------------------------------

interface MealsProps {
  planLoading: boolean;
  plan: PlanType | null;
}

// -------------------------------------

export default function Meals({ planLoading, plan }: MealsProps) {
  return (
    <Box>
      {planLoading ? (
        <Box sx={{ px: 2 }}>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} width={'100%'} height={329} sx={{ mb: 2 }} />
          ))}
        </Box>
      ) : (
        <MealsList plan={plan} />
      )}
    </Box>
  );
}
