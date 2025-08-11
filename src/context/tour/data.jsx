import { useMemo } from 'react';
import PropTypes from 'prop-types';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';

export default function useTourData({ isOverLimit }) {
  const { t } = useTranslate();
  const { user } = useStore();

  const introTour = [
    {
      target: '.progress__tour__1',
      // you can add the isOverLimit text later if necessary
      content: t('progress__tour__1'),
      disableBeacon: true,
      prevPath: null,
      nextPath: null,
      placement: 'bottom-end',
    },
    {
      target: '.progress__tour__2',
      content: t('progress__tour__2'),
      prevPath: null,
      nextPath: null,
    },
    {
      target: '.progress__tour__3',
      content: t('progress__tour__3'),
      prevPath: null,
      nextPath: null,
    },
    // {
    //   target: '.profile__tour__1',
    //   content: t('profile__tour__1'),
    //   placement: 'bottom',
    //   prevPath: paths.progress,
    //   nextPath: paths.dashboard,
    // },
  ];

  const dashboardTour = [
    {
      target: '.dash__tour__1',
      content: t('dash__tour__1'),
      placement: 'bottom',
      prevPath: null,
      nextPath: null,
    },
    {
      target: '.dash__tour__2',
      content: t('dash__tour__2'),
      prevPath: null,
      nextPath: null,
    },
    {
      target: '.dash__tour__3',
      content: t('dash__tour__3'),
      prevPath: null,
      nextPath: null,
    },
    {
      target: '.dash__tour__4',
      content: t('dash__tour__4'),
      prevPath: null,
      nextPath: null,
    },
    {
      target: '.dash__tour__5',
      content: t('dash__tour__5'),
      prevPath: null,
      nextPath: null,
    },
    {
      target: '.dash__tour__6',
      content: t('dash__tour__6'),
      prevPath: null,
      nextPath: null,
    },
  ];

  // const susbcriptionsTour = [
  // {
  //   target: '.subs__tour__1',
  //   content: t('subs__tour__1'),
  //   prevPath: paths.user.profile,
  //   nextPath: null,
  // },
  // {
  //   target: '.subs__tour__2',
  //   content: t('subs__tour__2'),
  //   prevPath: null,
  //   nextPath: null,
  // },
  // {
  //   target: '.subs__tour__3',
  //   content: t('subs__tour__3'),
  //   prevPath: null,
  //   nextPath: null,
  //   placement: 'bottom',
  // },
  // ]

  const memoizedValue = useMemo(
    () => ({
      intro: introTour,
      dashboard: dashboardTour,
    }),
    // eslint-disable-next-line
    [t, user, isOverLimit]
  );
  return memoizedValue;
}

useTourData.propTypes = {
  isOverLimit: PropTypes.bool,
};
