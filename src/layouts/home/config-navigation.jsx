import { useMemo } from 'react';

import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export function useNavConfig() {
  const { t } = useTranslate();

  const memoizedValue = useMemo(() => {
    return [
      {
        title: t('home'),
        icon: <Iconify icon="solar:home-2-bold-duotone" />,
        path: '/',
      },

      {
        title: t('aboutUs'),
        icon: <Iconify icon="mdi:about-circle-outline" />,
        path: paths.about,
      },
      {
        title: t('contactUs'),
        icon: <Iconify icon="solar:phone-bold-duotone" />,
        path: paths.contact,
      },
      {
        title: t('faqs'),
        icon: <Iconify icon="wpf:faq" />,
        path: paths.faqs,
      },
      // {
      //   title: t('coachRegister'),
      //   icon: <Iconify icon="solar:login-bold-duotone" />,
      //   path: paths.steps.coach,
      // },
    ];
  }, [t]);
  return memoizedValue;
}
