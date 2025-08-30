import { useCallback, useMemo } from 'react';

import useStore from 'src/store';
import CircleButton from 'src/components/circle-button';

export default function AddNewMeal() {
  const { plan, createMeal } = useStore((state) => state);
  const mealIndex = useMemo(() => plan?.meals?.length ?? 0, [plan?.meals]);
  const handleCreateMeal = useCallback(async () => {
    try {
      createMeal(mealIndex);
    } catch (error) {
      console.log(error);
    }
  }, [mealIndex, createMeal]);

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
