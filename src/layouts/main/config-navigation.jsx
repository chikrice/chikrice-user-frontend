import { useMemo } from 'react';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export function useNavConfig() {
  const { t } = useTranslate();
  const { user } = useStore();
  const isCoach = user?.role === 'coach' || false;

  const memoizedValue = useMemo(() => {
    const coachBtn = isCoach
      ? [
          {
            title: t('clients'),
            icon: <Iconify width={24} icon="proicons:person-2" />,
            path: paths.clients,
          },
        ]
      : [];

    const userBtn = isCoach
      ? []
      : [
          {
            title: t('progress'),
            icon: <Iconify width={24} icon="hugeicons:analytics-up" />,
            path: paths.progress,
          },
          {
            title: t('dashboard'),
            icon: <Iconify width={24} icon="hugeicons:dashboard-square-03" />,
            path: paths.dashboard,
          },
        ];

    const navItems = [...coachBtn, ...userBtn];

    return navItems;
  }, [t, isCoach]);

  return memoizedValue;
}
