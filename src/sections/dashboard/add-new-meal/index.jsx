import PropTypes from 'prop-types';
import { useCallback } from 'react';

import { createMeal } from 'src/api/plans';
import CircleButton from 'src/components/circle-button';

export default function AddNewMeal({ planId }) {
  const handleCreateMeal = useCallback(async () => {
    try {
      await createMeal(planId);
    } catch (error) {
      console.log(error);
    }
  }, [planId]);
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
