import PropTypes from 'prop-types';
import { useCallback } from 'react';

import useStore from 'src/store';
import { api, endpoints } from 'src/utils/axios';
import CircleButton from 'src/components/circle-button';

export default function AddNewMeal({ plan }) {
  const { getPlan } = useStore((state) => state);
  const handleCreateMeal = useCallback(async () => {
    try {
      await api.post(endpoints.plans.meals.create(plan.id));
    } catch (error) {
      console.log(error);
    } finally {
      await getPlan(plan.id);
    }
  }, [plan?.id]);
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

AddNewMeal.propTypes = {
  planId: PropTypes.string,
};
