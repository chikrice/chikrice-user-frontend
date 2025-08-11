import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';

// import { useTranslate } from 'src/locales';
import { useSearchParams } from 'src/routes/hooks';
import CustomGroupToggler from 'src/components/group-toggler/group-toggler';

import DayOptions from '../day-options';
import CustomSubscriptionContent from '../custom-subs-content';
import { customPlansConfig, generalPlansConfig } from '../data';
import GeneralSubscriptionContent from '../general-subs-content';
// import ContinueTour from 'src/components/welcome-guide/continue-tour';
// import { useTourContext } from 'src/context/hooks/use-tour-hook';

// import CarouselCategory from '../home-carousel';
// import { HomeSkeleton } from '../home-skeleton';
// ----------------------------------------------------------------------

export default function SubscriptionsView() {
  // const { t } = useTranslate();
  // const { isFirstLogin } = useTourContext();
  const searchParams = useSearchParams();

  const [activeGroup, setActiveGroup] = useState('custom');
  const [activeDay, setActiveDay] = useState(14);

  const handleChangeGroup = (value) => {
    setActiveGroup(value);
  };

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setActiveGroup(category);
    }
  }, [searchParams]);

  return (
    <Container sx={{ pb: 20 }}>
      {/* {isFirstLogin && <ContinueTour tourName="dashboard" />} */}

      <CustomGroupToggler
        groupOneValue={'custom'}
        groupTwoValue={'general'}
        activeGroup={activeGroup}
        onToggle={handleChangeGroup}
        className={'subs__tour__1'}
      />

      <DayOptions activeDay={activeDay} setActiveDay={setActiveDay} />

      {activeGroup === 'custom' ? (
        <CustomSubscriptionContent plans={customPlansConfig[activeDay]} activeDay={activeDay} />
      ) : (
        <GeneralSubscriptionContent plans={generalPlansConfig[activeDay]} activeDay={activeDay} />
      )}
    </Container>
  );
}
