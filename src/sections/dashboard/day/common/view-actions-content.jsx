// import { mutate } from 'swr';
import PropTypes from 'prop-types';

// import { useCallback } from 'react';
// import { endpoints } from 'src/utils/axios';
// import { switchMealOption } from 'src/api/plan-day';
import CustomIconButton from 'src/components/custom-icon-button';

export default function ViewActionsContent({
  // index,
  // isPast,
  // planDayId,
  onShowInfo,
  // onListAlternatives,
}) {
  // const handleSwitchMeal = useCallback(async () => {
  //   try {
  //     await switchMealOption(planDayId, { index, alternativeIndex: null });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     await mutate(endpoints.plan_day.root(planDayId));
  //   }
  // }, [index, planDayId]);

  return (
    <>
      {/* {!isPast && <CustomIconButton icon={'ci:arrow-reload-02'} onClick={handleSwitchMeal} />} */}
      <CustomIconButton icon={'fluent:info-28-regular'} onClick={onShowInfo} />
      {/* {!isPast && <CustomIconButton icon={'fa6-solid:list-ul'} onClick={onListAlternatives} />} */}
    </>
  );
}

ViewActionsContent.propTypes = {
  isPast: PropTypes.bool,
  index: PropTypes.number,
  planDayId: PropTypes.string,
  onShowInfo: PropTypes.func,
  onListAlternatives: PropTypes.func,
};
