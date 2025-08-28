import { useCallback } from 'react';

import useStore from 'src/store';
import { api, endpoints } from 'src/utils/axios';
import CircleButton from 'src/components/circle-button';

import type { PlanType } from 'chikrice-types';

interface AddNewMealProps {
  plan: PlanType;
}

export default function AddNewMeal({ plan }: AddNewMealProps) {
  const { getPlan } = useStore((state) => state);

  const handleCreateMeal = useCallback(async () => {
    try {
      await api.post(endpoints.plans.meals.create(plan.id));
    } catch (error) {
      console.log(error);
    } finally {
      await getPlan(plan.id);
    }
  }, [plan?.id, getPlan]);

  return (
    <CircleButton
      icon="ph:plus-bold"
      width={55}
      style={{ right: 16 }}
      sx={{ position: 'absolute', bottom: 122 }}
      onClick={handleCreateMeal}
    />
  );
}
